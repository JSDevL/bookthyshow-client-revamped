import {Component, OnDestroy, OnInit} from '@angular/core';
import {Mapping} from '../../shared/models/mapping.model';
import {Subscription} from 'rxjs/Subscription';
import {MappingsService} from '../../shared/services/mappings.service';
import * as _ from 'underscore';
import {BookingsService} from '../bookings.service';
import {Booking} from '../../shared/models/booking.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-select-date-time',
    templateUrl: './select-date-time.component.html',
    styleUrls: ['./select-date-time.component.scss']
})
export class SelectDateTimeComponent implements OnInit, OnDestroy {

    public mappings: Mapping[];
    private mappingsSubscription: Subscription;

    private newBooking: Booking;
    private newBookingSubscription: Subscription;

    public availableDates: Date[];

    constructor(private mappingsService: MappingsService,
                private bookingsService: BookingsService,
                private router: Router) {
    }

    ngOnInit() {
        this.mappingsSubscription = this.mappingsService.mappings$.subscribe((mappings: Mapping[]) => {
            this.mappings = mappings;
            this.availableDates = _.uniq(_.flatten(_.pluck(this.mappings, 'dates')));
        });

        this.newBookingSubscription = this.bookingsService.newBooking$.subscribe((booking: Booking) => {
            this.newBooking = booking;

            if (this.newBooking.date && this.newBooking.timing) {
                this.router.navigate(['/booking', 'select-seats']);
            }
        });
    }

    onDateSelect(date: Date) {
        this.newBooking.date = date;
        this.bookingsService.newBookingSource.next(this.newBooking);
    }

    onTimingSelect(timing: Date) {
        this.newBooking.timing = timing;
        this.bookingsService.newBookingSource.next(this.newBooking);
    }

    ngOnDestroy() {
        this.mappingsSubscription.unsubscribe();
    }

}
