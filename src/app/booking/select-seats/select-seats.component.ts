import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingsService} from '../bookings.service';
import {Booking} from '../../shared/models/booking.model';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'underscore';
import {Seat} from '../../shared/models/seat.model';

@Component({
    selector: 'app-select-seats',
    templateUrl: './select-seats.component.html',
    styleUrls: ['./select-seats.component.scss']
})
export class SelectSeatsComponent implements OnInit, OnDestroy {

    private SEAT_LIMIT = 10;

    public newBooking: Booking;
    private newBookingSubscription: Subscription;

    constructor(private bookingsService: BookingsService) {
    }

    ngOnInit() {
        this.newBookingSubscription = this.bookingsService.newBooking$.subscribe((newBooking: Booking) => {

            this.newBooking = newBooking;

            if (!this.newBooking.selectedSeats) {
                this.newBooking.selectedSeats = [];
            }
        });
    }

    onSelectSeat(seat) {
        switch (seat.status) {
            case 'reserved':
                alert('Sorry. This seat has been reserved');
                break;
            case 'available':
                if (this.newBooking.selectedSeats.length === this.SEAT_LIMIT) {
                    alert('Sorry. you may book a maximum of 10 seats per booking');
                    break;
                }
                this.newBooking.selectedSeats = [
                    ...this.newBooking.selectedSeats,
                    {row: seat.row, col: seat.col}
                ];
                this.bookingsService.newBookingSource.next(this.newBooking);
                break;
            case 'selected':
                this.newBooking.selectedSeats = _.reject(this.newBooking.selectedSeats, (s: Seat) => {
                    return s.row === seat.row && s.col === seat.col;
                });
                this.bookingsService.newBookingSource.next(this.newBooking);
                break;
        }
    }

    ngOnDestroy() {
        this.newBookingSubscription.unsubscribe();
    }

}
