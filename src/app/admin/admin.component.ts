import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Subscription} from 'rxjs/subscription';

import {MoviesService} from '../shared/services/movies.service';
import {CitiesService} from '../shared/services/cities.service';
import {TheatresService} from '../shared/services/theatres.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
    providers: [MoviesService, CitiesService, TheatresService]
})
export class AdminComponent implements OnInit, OnDestroy {

	private routeDataSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private moviesService: MoviesService,
                private citiesService: CitiesService,
                private theatresService: TheatresService) {
    }

	ngOnInit() {}

	onRouteActive(e) {
		this.routeDataSubscription = this.route.data.subscribe( (data: Data) => {
			this.moviesService.moviesSource.next(data['movies']);
            this.citiesService.citiesSource.next(data['cities']);
            this.theatresService.theatresSource.next(data['theatres']);
		});
	}

	ngOnDestroy() {
		this.routeDataSubscription.unsubscribe();
	}
}
