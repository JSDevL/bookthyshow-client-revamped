import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Movie} from '../shared/models/movie.model';
import {MappingsService} from '../shared/services/mappings.service';
import {BookingsService} from './bookings.service';
import {Booking} from '../shared/models/booking.model';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    providers: [MappingsService, BookingsService]
})
export class BookingComponent implements OnInit, OnDestroy {

    public newBooking: Booking;
    private newBookingSubscription: Subscription;

    public movie: Movie;
    private dataSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private mappingsService: MappingsService,
                private bookingService: BookingsService) {
    }

    ngOnInit() {
    }

    onRouteActive(e) {
        this.newBookingSubscription = this.bookingService.newBooking$.subscribe((newBooking: Booking) => {
            this.newBooking = newBooking;
        });

        this.dataSubscription = this.route.data.subscribe((data: Data) => {
            this.movie = data['mappings'][0].movie;

            if (!this.newBooking) {
                this.newBooking = {movie: data['mappings'][0].movie};
            }

            this.mappingsService.mappingsSource.next(data['mappings']);
            this.bookingService.newBookingSource.next(this.newBooking);
        });
    }

    ngOnDestroy() {
        this.newBookingSubscription.unsubscribe();
        this.dataSubscription.unsubscribe();
    }

}
