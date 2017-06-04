import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http, Response} from '@angular/http';

import {Theatre} from '../models/theatre.model';

@Injectable()
export class TheatresService {

    public theatresSource: Subject<Theatre[]>;
    public theatres$: Observable<Theatre[]>;

    constructor(private http: Http) {
        this.theatresSource = new Subject<Theatre[]>();
        this.theatres$ = this.theatresSource.asObservable();
    }

    postTheatre(theatre: Theatre): Observable<Theatre> {
        return this.http.post('/api/theatres', theatre).map((response: Response) => {
            return <Theatre>response.json();
        }).catch((error: any) => {
            throw error.json();
        });
    }

    getTheatres(): Observable<Theatre[]> {
        return this.http.get('/api/theatres').map((response: Response) => <Theatre[]>response.json());
    }

    deleteTheatre(theatre_id: String): Observable<Response> {
        return this.http.delete(`/api/theatres/${theatre_id}`);
    }
}
