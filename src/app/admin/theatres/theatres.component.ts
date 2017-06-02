import {Component, OnInit} from '@angular/core';

import {City} from '../../shared/models/city.model';

@Component({
    selector: 'app-theatres',
    templateUrl: './theatres.component.html',
    styleUrls: ['./theatres.component.scss'],
})
export class TheatresComponent implements OnInit {

    public selectedCity: City;

    constructor() {
    }

    ngOnInit() {
    }

    onSelectedCity(city): void {
        this.selectedCity = city;
    }
}
