import {Component, OnDestroy, OnInit} from '@angular/core';
import {Seat} from '../../../shared/models/seat.model';
import * as _ from 'underscore';
import {Booking} from '../../../shared/models/booking.model';
import {Subscription} from 'rxjs/Subscription';
import {BookingsService} from '../../bookings.service';

@Component({
    selector: 'app-seats-grid',
    templateUrl: './seats-grid.component.html',
    styleUrls: ['./seats-grid.component.scss']
})
export class SeatsGridComponent implements OnDestroy, OnInit {

    private SEAT_LIMIT = 10;
    private ROWS = 15;
    private COLS = 20;

    public grid: Seat[][] = [];

    public newBooking: Booking;
    private newBookingSubscription: Subscription;

    constructor(private bookingsService: BookingsService) {
        for (let r = 0; r < this.ROWS; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.COLS; c++) {
                this.grid[r][c] = {
                    row: r,
                    col: c,
                    status: 'available'
                };
            }
        }
    }

    ngOnInit() {
        this.newBookingSubscription = this.bookingsService.newBooking$.subscribe((newBooking: Booking) => {
            this.newBooking = newBooking;

            if (!this.newBooking.selectedSeats) {
                this.newBooking.selectedSeats = [];
                this.newBooking.seatClass = '';
            }
        });
    }

    onSeatClick(seat: Seat, seatClass: String) {
        switch (seat.status) {
            case 'reserved':
                alert('Sorry. This seat has been reserved');
                break;
            case 'available':
                if (this.newBooking.seatClass === seatClass) {
                    if (this.newBooking.selectedSeats.length === this.SEAT_LIMIT) {
                        alert('Sorry. you may book a maximum of 10 seats per booking');
                        break;
                    }

                    this.grid[seat.row][seat.col].status = 'selected';
                    this.newBooking.selectedSeats = [
                        ...this.newBooking.selectedSeats,
                        {row: seat.row, col: seat.col}
                    ];
                } else {
                    _.each(this.newBooking.selectedSeats, s => this.grid[s.row][s.col].status = 'available');
                    this.grid[seat.row][seat.col].status = 'selected';
                    this.newBooking.selectedSeats = [
                        {row: seat.row, col: seat.col}
                    ];
                    this.newBooking.seatClass = seatClass;
                }

                this.bookingsService.newBookingSource.next(this.newBooking);
                break;
            case 'selected':
                this.grid[seat.row][seat.col].status = 'available';
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
