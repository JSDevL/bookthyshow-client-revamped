import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';

import { Movie } from '../../../shared/models/movie.model';

@Injectable()
export class TmdbApiService {

	private TOKEN = '04166961144eb9ab67893ea41eb1cb97';

	constructor(private http: Http) {}

	public searchMovies(query: String): Observable<Movie[]> {
		// set params
		const params = new URLSearchParams();
		params.set('query', <string>query);
		params.set('api_key', this.TOKEN);
		// initialise request options with params
		const requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(`https://api.themoviedb.org/3/search/movie`, requestOptions)
			.map( (response: Response) => <Movie[]>response.json().results );
	}

	public searchMovie(movie_id: String): Observable<Movie> {
		// set params
		const params = new URLSearchParams();
		params.set('api_key', this.TOKEN);
		// initialise request options with params
		const requestOptions = new RequestOptions();
		requestOptions.params = params;

		return this.http.get(`https://api.themoviedb.org/3/movie/${movie_id}`, requestOptions)
			.map( (response: Response) => <Movie>response.json() );
	}
}
