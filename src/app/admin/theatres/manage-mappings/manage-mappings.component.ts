import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Theatre} from '../../../shared/models/theatre.model';
import {Movie} from '../../../shared/models/movie.model';
import {Mapping} from 'app/shared/models/mapping.model';
import {Subscription} from 'rxjs/Subscription';
import {MappingsService} from '../../../shared/services/mappings.service';
import * as _ from 'underscore';
import {NgForm} from '@angular/forms';
import {Response} from '@angular/http';

@Component({
    selector: 'app-manage-mappings',
    templateUrl: './manage-mappings.component.html',
    styleUrls: ['./manage-mappings.component.scss']
})
export class ManageMappingsComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('newDateForm')
    newDateForm: NgForm;

    @ViewChild('newTimingForm')
    newTimingForm: NgForm;

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
            if (this.selectedTheatre) {
                return mapping.theatre._id === this.selectedTheatre._id && mapping.movie._id === this.selectedMovie._id;
            } else {
                return undefined;
            }
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

    public addDate() {
        this.activeMapping.dates.push(new Date(this.newDateForm.value['date']));
        this.activeMapping.dates = _.sortBy(_.uniq(this.activeMapping.dates));

        this.newDateForm.reset();
    }

    public addTiming() {
        const hours: number = parseInt(this.newTimingForm.value['timing'].split(':')[0], 10);
        const minutes: number = parseInt(this.newTimingForm.value['timing'].split(':')[1], 10);
        const dateObject: Date = new Date();
        dateObject.setHours(hours);
        dateObject.setMinutes(minutes);
        this.activeMapping.timings.push(dateObject);
        this.activeMapping.timings = _.sortBy(_.uniq(this.activeMapping.timings));

        this.newTimingForm.reset();
    }

    public deleteDate(dateToDelete) {
        this.activeMapping.dates = _.reject(this.activeMapping.dates, (date: Date) => date === dateToDelete);
    }

    public deleteTiming(timingToDelete) {
        this.activeMapping.timings = _.reject(this.activeMapping.timings, (timing: Date) => timing === timingToDelete);
    }

    public saveMapping() {
        if (!this.activeMapping._id) {
            this.mappingsService.postMapping(this.activeMapping).subscribe((mapping: Mapping) => {
                this.activeMapping = _.extend(this.activeMapping, mapping);
                alert('Mapping saved.');
            });
        } else {
            this.mappingsService.putMapping(this.activeMapping).subscribe((mapping: Mapping) => {
                this.activeMapping = _.extend(this.activeMapping, mapping);
                alert('Mapping saved.');
            });
        }
    }

    public deleteMapping() {
        this.mappingsService.deleteMapping(this.activeMapping).subscribe((response: Response) => {
            this.mappingsService.mappingsSource.next(
                _.reject(this.mappings, (mapping: Mapping) => mapping._id === this.activeMapping._id)
            );
            alert('Mapping deleted.');
        });
    }

    ngOnDestroy() {
        this.mappingsSubscription.unsubscribe();
    }
}
