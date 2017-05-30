import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { AdminComponent } from '../../admin/admin.component';
import { MoviesComponent } from '../../admin/movies/movies.component';
import { TheatresComponent } from '../../admin/theatres/theatres.component';

import { MoviesService } from '../services/movies.service';
import { MoviesResolveService } from './movies-resolve.service';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'admin',
		component: AdminComponent,
		resolve: {
			movies: MoviesResolveService
		},
		children: [
			{
				path: 'movies',
				component: MoviesComponent
			},
			{
				path: 'theatres',
				component: TheatresComponent
			}
		]
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true }),
		CommonModule
	],
	exports: [
		RouterModule
	],
	providers: [
		MoviesResolveService,
		MoviesService
	],
	declarations: []
})
export class RoutesModule { }
