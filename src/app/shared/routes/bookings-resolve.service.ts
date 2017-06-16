import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Booking} from '../models/booking.model';
import {BookingsService} from '../../booking/bookings.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BookingsResolveService implements Resolve<Booking[]> {

    constructor(private bookingsService: BookingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Booking[]> | Promise<Booking[]> | Booking[] {
        return this.bookingsService.getBookings(route.queryParams);
    }

}
