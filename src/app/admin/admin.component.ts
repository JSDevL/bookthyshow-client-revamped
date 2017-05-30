import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { Movie } from '../shared/models/movie.model';

import { MoviesService } from '../shared/services/movies.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	providers: [MoviesService]
})
export class AdminComponent implements OnInit, OnDestroy {

	private routeDataSubscription: Subscription;

	constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

	ngOnInit() {}

	onRouteActive(e) {
		this.routeDataSubscription = this.route.data.subscribe( (data: Data) => {
			this.moviesService.moviesSource.next(data['movies']);
		});
	}

	ngOnDestroy() {
		this.routeDataSubscription.unsubscribe();
	}
}
