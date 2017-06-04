import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http, Response} from '@angular/http';

import {City} from '../models/city.model';

@Injectable()
export class CitiesService {

    public citiesSource: Subject<City[]>;
    public cities$: Observable<City[]>;

    constructor(private http: Http) {
        this.citiesSource = new Subject<City[]>();
        this.cities$ = this.citiesSource.asObservable();
    }

    postCity(city: City): Observable<City> {
        return this.http.post('/api/cities', city).map((response: Response) => <City>response.json())
            .catch((error: any) => {
                throw error.json();
            });
    }

    getCities(): Observable<City[]> {
        return this.http.get('/api/cities').map((response: Response) => <City[]>response.json());
    }

    deleteCity(city_id: String): Observable<Response> {
        return this.http.delete(`/api/cities/${city_id}`);
    }
}
