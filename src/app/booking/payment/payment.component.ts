import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Booking} from '../../shared/models/booking.model';
import {Subscription} from 'rxjs/Subscription';
import {BookingsService} from '../bookings.service';
import {NgForm} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';
import {Router} from '@angular/router';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

    @ViewChild('bookingModal')
    bookingModal: ModalDirective;

    @ViewChild('newBookingForm')
    newBookingForm: NgForm;

    public tax = 40;
    public classPricing = {
        'SOFA': 240,
        'GOLD': 180,
        'ECONOMY': 120
    };

    public newBooking: Booking;
    private newBookingSubscription: Subscription;

    constructor(private bookingService: BookingsService, private router: Router) {
    }

    ngOnInit() {
        this.newBookingSubscription = this.bookingService.newBooking$.subscribe((newBooking: Booking) => {
            this.newBooking = newBooking;
        });
    }

    postBooking() {
        this.newBooking.paymentDetails = this.newBookingForm.value;
        this.bookingService.postBooking(this.newBooking).subscribe((booking: Booking) => {
            this.newBooking._id = booking._id;
            this.bookingModal.show();
        });
    }

    proceed() {
        this.router.navigate(['/']);
    }

    ngOnDestroy() {
        this.newBookingSubscription.unsubscribe();
    }

}
