import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingsService} from '../bookings.service';

@Component({
    selector: 'app-select-seats',
    templateUrl: './select-seats.component.html',
    styleUrls: ['./select-seats.component.scss']
})
export class SelectSeatsComponent implements OnInit, OnDestroy {

    constructor(private bookingsService: BookingsService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
