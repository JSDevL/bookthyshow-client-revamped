import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {City} from '../models/city.model';

import {CitiesService} from '../services/cities.service';

@Injectable()
export class CitiesResolveService implements Resolve<City[]> {

    constructor(private citiesService: CitiesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<City[]> | Promise<City[]> | City[] {
        return this.citiesService.getCities();
    }

}
