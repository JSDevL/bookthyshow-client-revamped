import {Component, OnInit} from '@angular/core';
import * as _ from 'underscore';

@Component({
    selector: 'app-seats-grid',
    templateUrl: './seats-grid.component.html',
    styleUrls: ['./seats-grid.component.scss']
})
export class SeatsGridComponent implements OnInit {

    columns: Number[] = [];
    rows: String[] = [];

    constructor() {
        this.columns = _.range(1, 20);
        for (const i of _.range(1, 15)) {
            this.rows.push(String.fromCharCode(65 + i));
        }
    }

    ngOnInit() {
    }

}
