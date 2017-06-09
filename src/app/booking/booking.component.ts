import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Movie} from '../shared/models/movie.model';
import {MappingsService} from '../shared/services/mappings.service';
import {BookingService} from './bookings.service';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    providers: [MappingsService, BookingService]
})
export class BookingComponent implements OnInit, OnDestroy {

    movie: Movie;
    dataSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private mappingsService: MappingsService,
                private bookingService: BookingService) {
    }

    ngOnInit() {
    }

    onRouteActive(e) {
        this.dataSubscription = this.route.data.subscribe((data: Data) => {
            this.mappingsService.mappingsSource.next(data['mappings']);
            this.movie = Object.create(data['mappings'][0].movie);

            this.bookingService.newBookingSource.next({
                movie: this.movie
            });
        });
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }

}
