import {Injectable} from '@angular/core';
import {Booking} from '../shared/models/booking.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class BookingsService {

    newBookingSource: Subject<Booking>;
    newBooking$: Observable<Booking>;

    constructor(private http: Http) {
        this.newBookingSource = new Subject<Booking>();
        this.newBooking$ = this.newBookingSource.asObservable();
    }

    getBookings(queryParams?): Observable<Booking[]> {
        if (queryParams) {
            // initialise request options with params
            const requestOptions = new RequestOptions();
            requestOptions.params = queryParams;
            return this.http.get('/api/bookings', requestOptions).map((response: Response) => <Booking[]>response.json());
        } else {
            return this.http.get('/api/bookings').map((response: Response) => <Booking[]>response.json());
        }
    }

    postBooking(booking: Booking): Observable<Booking> {
        return this.http.post('/api/bookings', booking).map((response: Response) => <Booking>response.json())
            .catch((error: any) => {
                throw error.json();
            });
    }

    getBooking(booking_id: String): Observable<Booking> {
        return this.http.get(`/api/bookings/${booking_id}`).map((response: Response) => <Booking>response.json());
    }

}
