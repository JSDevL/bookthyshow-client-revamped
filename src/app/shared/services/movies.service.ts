import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http, Response } from '@angular/http';

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {

	public moviesSource: Subject<Movie[]>;
	public movies$: Observable<Movie[]>;

	constructor(private http: Http) {
		this.moviesSource = new Subject<Movie[]>();
		this.movies$ = this.moviesSource.asObservable();
	}

	getMovies(): Observable<Movie[]> {
		return this.http.get('/api/movies').map( (response: Response) => {
			return <Movie[]>response.json();
		});
	}
}
