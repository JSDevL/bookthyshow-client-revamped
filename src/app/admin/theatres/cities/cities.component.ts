import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import * as _ from 'underscore';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {City} from '../../../shared/models/city.model';

import {CitiesService} from '../../../shared/services/cities.service';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnDestroy {

    @Input()
    selectedCity: City;

    @Output()
    selectCity = new EventEmitter<City>();

    @ViewChild('newCityForm')
    newCityForm: NgForm;

    public cities: City[] = [];
    citiesSubscription: Subscription;

    constructor(private citiesService: CitiesService) {
    }

    ngOnInit() {
        this.citiesSubscription = this.citiesService.cities$.subscribe((cities: City[]) => {
            this.cities = cities;
        });
    }

    public postCity(): void {
        this.citiesService.postCity(this.newCityForm.value).subscribe((city: City) => {
            this.cities.push(city);
            this.citiesService.citiesSource.next(this.cities);

            this.newCityForm.reset();

            alert('City added.');
        });
    }

    public deleteCity(cityToDelete: City): void {
        this.citiesService.deleteCity(cityToDelete._id).subscribe(() => {
            this.citiesService.citiesSource.next(_.reject(this.cities, (city: City) => city._id === cityToDelete._id));

            if (this.selectedCity._id === cityToDelete._id) {
                this.selectCity.emit(undefined);
            }

            alert('City deleted');
        });
    }

    ngOnDestroy() {
        this.citiesSubscription.unsubscribe();
    }
}
