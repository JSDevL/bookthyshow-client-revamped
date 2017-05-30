import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { Movie } from '../../shared/models/movie.model';

import { MoviesService } from '../../shared/services/movies.service';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

	public movies: Movie[];
	private moviesSubscription: Subscription;

	constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

	ngOnInit() {
		this.moviesSubscription = this.moviesService.movies$.subscribe( (movies: Movie[]) => {
			this.movies = movies;
			console.log(this.movies);
		});
	}

	ngOnDestroy() {
		this.moviesSubscription.unsubscribe();
	}
}
