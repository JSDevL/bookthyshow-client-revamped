import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Seat} from '../../../shared/models/seat.model';
import * as _ from 'underscore';

@Component({
    selector: 'app-seats-grid',
    templateUrl: './seats-grid.component.html',
    styleUrls: ['./seats-grid.component.scss']
})
export class SeatsGridComponent implements OnChanges {

    private ROWS = 15;
    private COLS = 20;

    public grid: Seat[][] = [];

    @Input('selectedSeats')
    selectedSeats: Seat[];

    @Input('reservedSeats')
    reservedSeats: Seat[];

    @Output('selectSeat')
    selectSeat = new EventEmitter<Seat>();

    constructor() {
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

    ngOnChanges(changes: SimpleChanges) {
        _.each(changes['selectedSeats'].previousValue, (seat: Seat) => {
            this.grid[seat.row][seat.col].status = 'available';
        });

        _.each(changes['selectedSeats'].currentValue, (seat: Seat) => {
            this.grid[seat.row][seat.col].status = 'selected';
        });
    }

}
