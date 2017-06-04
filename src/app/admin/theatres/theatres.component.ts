import {Component, OnDestroy, OnInit} from '@angular/core';

import {City} from '../../shared/models/city.model';
import {Theatre} from 'app/shared/models/theatre.model';
import {Movie} from '../../shared/models/movie.model';
import {Subscription} from 'rxjs/Subscription';
import {MoviesService} from '../../shared/services/movies.service';

@Component({
    selector: 'app-theatres',
    templateUrl: './theatres.component.html',
    styleUrls: ['./theatres.component.scss'],
})
export class TheatresComponent implements OnInit, OnDestroy {

    public selectedMovie: Movie;
    public selectedCity: City;
    public selectedTheatre: Theatre;

    public movies: Movie[];
    private moviesSubscription: Subscription;

    constructor(private moviesService: MoviesService) {
    }

    ngOnInit() {
        this.moviesSubscription = this.moviesService.movies$.subscribe((movies: Movie[]) => {
            this.movies = movies;

            if (!this.selectedMovie) {
                this.selectedMovie = movies[0];
            }
        });
    }

    onSelectedTheatre(theatre: Theatre): void {
        this.selectedTheatre = theatre;
    }

    onSelectedCity(city: City): void {
        this.selectedCity = city;
    }

    ngOnDestroy() {
        this.moviesSubscription.unsubscribe();
    }
}
