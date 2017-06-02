import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../../../shared/services/movies.service';
import {Movie} from '../../../shared/models/movie.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-manage-mappings',
    templateUrl: './manage-mappings.component.html',
    styleUrls: ['./manage-mappings.component.scss']
})
export class ManageMappingsComponent implements OnInit, OnDestroy {

    @Input('selectedTheatre')
    selectedTheatre;

    public movies: Movie[];
    private moviesSubscription: Subscription;

    constructor(private moviesService: MoviesService) {
    }

    ngOnInit() {
        this.moviesSubscription = this.moviesService.movies$.subscribe((movies: Movie[]) => {
            this.movies = movies;
        });
    }

    ngOnDestroy() {
        this.moviesSubscription.unsubscribe();
    }
}
