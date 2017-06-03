import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Mapping} from '../models/mapping.model';

@Injectable()
export class MappingsService {

    constructor(private http: Http) {
    }

    getMappings(): Observable<Mapping[]> {
        return this.http.get('/api/mappings').map((response: Response) => <Mapping[]>response.json());
    }
}
