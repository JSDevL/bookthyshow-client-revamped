import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Theatre} from '../../../shared/models/theatre.model';
import {Movie} from '../../../shared/models/movie.model';
import {Mapping} from 'app/shared/models/mapping.model';
import {Subscription} from 'rxjs/Subscription';
import {MappingsService} from '../../../shared/services/mappings.service';
import * as _ from 'underscore';

@Component({
    selector: 'app-manage-mappings',
    templateUrl: './manage-mappings.component.html',
    styleUrls: ['./manage-mappings.component.scss']
})
export class ManageMappingsComponent implements OnInit, OnDestroy, OnChanges {

    @Input('selectedTheatre')
    selectedTheatre: Theatre;

    @Input('selectedMovie')
    selectedMovie: Movie;

    public mappings: Mapping[];
    private mappingsSubscription: Subscription;

    public activeMapping: Mapping;

    constructor(private mappingsService: MappingsService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.searchActiveMapping();
    }

    ngOnInit() {
        this.mappingsSubscription = this.mappingsService.mappings$.subscribe((mappings: Mapping[]) => {
            this.mappings = mappings;
            this.searchActiveMapping();
        });
    }

    private searchActiveMapping() {
        this.activeMapping = _.find(this.mappings, (mapping: Mapping) => {
            return _.isEqual(mapping.theatre, this.selectedTheatre) && _.isEqual(mapping.movie, this.selectedMovie);
        });
    }

    public createMapping() {
        this.mappingsService.mappingsSource.next([
            ...this.mappings,
            {
                theatre: this.selectedTheatre,
                movie: this.selectedMovie,
                timings: [],
                dates: []
            }
        ]);
    }

    ngOnDestroy() {
        this.mappingsSubscription.unsubscribe();
    }
}
