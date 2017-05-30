import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';

import { Movie } from '../../../shared/models/movie.model';

import { TmdbApiService } from './tmdb-api.service';
import { MoviesService } from '../../../shared/services/movies.service';

@Component({
	selector: 'app-movie-search',
	templateUrl: './movie-search.component.html',
	styleUrls: ['./movie-search.component.scss'],
	providers: [TmdbApiService]
})
export class MovieSearchComponent implements OnInit, OnDestroy {

	@ViewChild('movieSearchForm')
	movieSearchForm: NgForm;

	addedMovies: Movie[];
	addedMoviesSubscription: Subscription;
	movieSearchResults: Movie[] = [];

	constructor(private http: Http, private moviesService: MoviesService, private tmdbApiService: TmdbApiService) {}

	ngOnInit() {
		this.addedMoviesSubscription = this.moviesService.movies$.subscribe( (movies: Movie[]) => {
			this.addedMovies = movies;
		});
	}

	public onMovieSearchFormSubmit(): void {
		if ( this.movieSearchForm.controls['movieTitle'].invalid ) {
			this.movieSearchResults = [];
			return;
		}

		this.tmdbApiService.searchMovies(this.movieSearchForm.value['movieTitle']).subscribe( (movies: Movie[]) => {
			this.movieSearchResults = movies;
		});
	}

	public postMovie(movie: Movie): void {
		this.tmdbApiService.searchMovie(movie.id).subscribe( (searchedMovie: Movie) => {
			this.moviesService.postMovie(searchedMovie).subscribe( (newMovie: Movie) => {
				alert('Movie added.');

				this.addedMovies.push(newMovie);
				this.moviesService.moviesSource.next(this.addedMovies);
			});
		});
	}

	ngOnDestroy() {
		this.addedMoviesSubscription.unsubscribe();
	}
}
