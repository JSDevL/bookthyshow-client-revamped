import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Mapping} from '../shared/models/mapping.model';
import {MappingsService} from '../shared/services/mappings.service';
import * as _ from 'underscore';
import {City} from '../shared/models/city.model';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MappingsService]
})
export class HomeComponent implements OnInit, OnDestroy {

    public movieSearchForm: FormGroup;
    public searchResults: Mapping[] = [];

    public cities: City[];
    public mappings: Mapping[];
    public mappingsByCityId: any;

    private dataSubscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dataSubscription = this.route.data.subscribe((data: Data) => {

            this.cities = data['cities'];
            this.mappings = data['mappings'];

            _.map(this.mappings, (mapping: Mapping) => {
                _.extend(mapping, {
                    'movie_id': mapping.movie._id,
                    'theatre_id': mapping.theatre._id,
                });
            });

            this.mappingsByCityId = _.groupBy(this.mappings, (mapping: Mapping) => mapping.theatre['city_id']);

            this.movieSearchForm = new FormGroup({
                'city_id': new FormControl(this.cities[0]._id, Validators.required),
                'query': new FormControl('', Validators.required)
            });

            this.movieSearchForm.valueChanges.subscribe(changes => {
                if (this.movieSearchForm.valid) {
                    this.searchResults = _.filter(this.mappings, (mapping: Mapping) => {
                        return ( mapping.movie.title.toLowerCase().search(changes['query'].toLowerCase()) !== -1 ) &&
                            ( mapping.theatre['city_id'] === this.movieSearchForm.value['city_id'] );
                    });
                } else {
                    this.searchResults = [];
                }
            });
        });
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }

}
