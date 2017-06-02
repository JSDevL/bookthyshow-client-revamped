import {Component, OnInit} from '@angular/core';

import {City} from '../../shared/models/city.model';
import {Theatre} from 'app/shared/models/theatre.model';

@Component({
    selector: 'app-theatres',
    templateUrl: './theatres.component.html',
    styleUrls: ['./theatres.component.scss'],
})
export class TheatresComponent implements OnInit {

    public selectedCity: City;
    public selectedTheatre: Theatre;

    constructor() {
    }

    ngOnInit() {
    }

    onSelectedTheatre(theatre: Theatre): void {
        this.selectedTheatre = theatre;
    }

    onSelectedCity(city: City): void {
        this.selectedCity = city;
    }
}
