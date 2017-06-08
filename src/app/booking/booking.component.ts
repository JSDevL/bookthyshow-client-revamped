import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Mapping} from '../shared/models/mapping.model';
import {Subscription} from 'rxjs/Subscription';
import {MappingsService} from '../shared/services/mappings.service';
import {Movie} from '../shared/models/movie.model';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {

    movie: Movie;

    movieMappings: Mapping[];
    movieMappingsSubscription: Subscription;

    dataSubscription: Subscription;

    constructor(private route: ActivatedRoute, private mappingsService: MappingsService) {
    }

    ngOnInit() {
        this.movieMappingsSubscription = this.mappingsService.mappings$.subscribe((mappings: Mapping[]) => {
            this.movieMappings = mappings;
            this.movie = Object.create(this.movieMappings[0].movie);
        });

        this.dataSubscription = this.route.data.subscribe((data: Data) => {
            this.mappingsService.mappingsSource.next(data['mappings']);
        });
    }

    ngOnDestroy() {
        this.movieMappingsSubscription.unsubscribe();
        this.dataSubscription.unsubscribe();
    }

}
