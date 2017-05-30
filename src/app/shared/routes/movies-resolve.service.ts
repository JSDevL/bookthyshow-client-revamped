import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Movie } from '../models/movie.model';

import { MoviesService } from '../services/movies.service';

@Injectable()
export class MoviesResolveService implements Resolve<Movie[]> {

	constructor(private moviesService: MoviesService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> | Promise<Movie[]> | Movie[] {
		return this.moviesService.getMovies();
	}

}
