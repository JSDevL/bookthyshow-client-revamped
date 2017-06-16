import {Component, OnDestroy, OnInit} from '@angular/core';
import {Booking} from '../../../shared/models/booking.model';
import {BookingsService} from '../../bookings.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
    selector: 'app-booking-overview',
    templateUrl: './booking-overview.component.html',
    styleUrls: ['./booking-overview.component.scss']
})
export class BookingOverviewComponent implements OnInit, OnDestroy {

    public tax = 40;
    public classPricing = {
        'SOFA': 240,
        'GOLD': 180,
        'ECONOMY': 120
    };

    public newBooking: Booking;
    private newBookingSubscription: Subscription;

    constructor(private bookingsService: BookingsService, private router: Router) {
    }

    ngOnInit() {
        this.newBookingSubscription = this.bookingsService.newBooking$.subscribe((newBooking: Booking) => {
            this.newBooking = newBooking;
        });
    }

    ngOnDestroy() {
        this.newBookingSubscription.unsubscribe();
    }
}
