import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingsService} from '../booking/bookings.service';
import {NgForm} from '@angular/forms';
import {Booking} from '../shared/models/booking.model';

@Component({
    selector: 'app-check',
    templateUrl: './check.component.html',
    styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

    @ViewChild('checkBookingForm')
    checkBookingForm: NgForm;

    public checkedBooking: Booking;

    constructor(private bookingsService: BookingsService) {
    }

    ngOnInit() {
    }

    getBooking() {
        this.bookingsService.getBooking(this.checkBookingForm.value['id']).subscribe((booking: Booking) => {
            this.checkedBooking = booking;
        }, (error) => {
            this.checkedBooking = undefined;
        });
    }

}
