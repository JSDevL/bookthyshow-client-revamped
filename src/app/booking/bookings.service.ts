import {Injectable} from '@angular/core';
import {Booking} from '../shared/models/booking.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BookingsService {

    newBookingSource: Subject<Booking>;
    newBooking$: Observable<Booking>;

    constructor() {
        this.newBookingSource = new Subject<Booking>();
        this.newBooking$ = this.newBookingSource.asObservable();
    }

}
