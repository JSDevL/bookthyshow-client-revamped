import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Mapping} from '../models/mapping.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MappingsService {

    public mappingsSource: Subject<Mapping[]>;
    public mappings$: Observable<Mapping[]>;

    constructor(private http: Http) {
        this.mappingsSource = new Subject<Mapping[]>();
        this.mappings$ = this.mappingsSource.asObservable();
    }

    postMapping(mapping: Mapping): Observable<Mapping> {
        return this.http.post('/api/mappings', mapping).map((response: Response) => <Mapping>response.json());
    }

    getMappings(): Observable<Mapping[]> {
        return this.http.get('/api/mappings').map((response: Response) => <Mapping[]>response.json());
    }

    deleteMapping(mapping: Mapping): Observable<Response> {
        return this.http.delete(`/api/mappings/${mapping._id}`);
    }

    putMapping(mapping: Mapping): Observable<Mapping> {
        return this.http.put(`/api/mappings/${mapping._id}`, mapping)
            .map((response: Response) => <Mapping>response.json());
    }
}
