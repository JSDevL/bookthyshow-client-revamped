import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';

import { Movie } from '../../../shared/models/movie.model';

import { MoviesService } from '../../../shared/services/movies.service';

@Component({
	selector: 'app-movie-search',
	templateUrl: './movie-search.component.html',
	styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

	private TOKEN = '04166961144eb9ab67893ea41eb1cb97';

	@ViewChild('movieSearchForm')
	movieSearchForm: NgForm;

	addedMovies: Movie[];
	movieSearchResults: Movie[] = [];

	constructor(private http: Http, private moviesService: MoviesService) {}

	ngOnInit() {
		this.moviesService.movies$.subscribe( (movies: Movie[]) => {
			this.addedMovies = movies;
		});
	}

	public onMovieSearchFormSubmit(): void {
		if ( this.movieSearchForm.controls['movieTitle'].invalid ) {
			this.movieSearchResults = [];
			return;
		}

		// set params
		const params = new URLSearchParams();
		params.set('query', this.movieSearchForm.value['movieTitle']);
		params.set('api_key', this.TOKEN);
		// initialise request options with params
		const requestOptions = new RequestOptions();
		requestOptions.params = params;
		this.http.get(`https://api.themoviedb.org/3/search/movie`, requestOptions).subscribe( (response: Response) => {
			this.movieSearchResults = <Movie[]>response.json().results;
		}, (error) => {
			throw error;
		});
	}

	public postMovie(movie: Movie): void {
		// set params
		const params = new URLSearchParams();
		params.set('api_key', this.TOKEN);
		// initialise request options with params
		const requestOptions = new RequestOptions();
		requestOptions.params = params;
		this.http.get(`https://api.themoviedb.org/3/movie/${movie.id}`, requestOptions).subscribe( (response: Response) => {
			this.moviesService.postMovie(response.json()).subscribe( (newMovie: Movie) => {
				this.addedMovies.push(newMovie);
				this.moviesService.moviesSource.next(this.addedMovies);
			});
		});
	}
}
