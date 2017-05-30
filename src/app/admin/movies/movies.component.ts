import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import * as _ from 'underscore';

import { Movie } from '../../shared/models/movie.model';

import { MoviesService } from '../../shared/services/movies.service';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

	public _ = _;
	public movies: Movie[] = [];
	private moviesSubscription: Subscription;

	constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

	ngOnInit() {
		this.moviesSubscription = this.moviesService.movies$.subscribe( (movies: Movie[]) => {
			this.movies = movies;
		});
	}

	deleteMovie(movieToDelete: Movie) {
		this.moviesService.deleteMovie(movieToDelete._id).subscribe( () => {
			this.moviesService.moviesSource.next(
				_.reject(this.movies, movie => movie._id === movieToDelete._id)
			);
		});
	}

	ngOnDestroy() {
		this.moviesSubscription.unsubscribe();
	}
}
