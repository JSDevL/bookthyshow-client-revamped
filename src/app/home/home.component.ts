import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Mapping} from '../shared/models/mapping.model';
import {MappingsService} from '../shared/services/mappings.service';
import * as _ from 'underscore';
import {City} from '../shared/models/city.model';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MappingsService]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('demoModal')
    demoModal: ModalDirective;

    public movieSearchForm: FormGroup;
    public searchResults: Mapping[] = [];

    public cities: City[];
    public mappings: Mapping[];

    private dataSubscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dataSubscription = this.route.data.subscribe((data: Data) => {

            this.cities = data['cities'];
            this.mappings = data['mappings'];

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

    ngAfterViewInit() {
        this.demoModal.show();
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }

}
