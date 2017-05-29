import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */

import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AdminComponent } from '../admin/admin.component';
import { MoviesComponent } from '../admin/movies/movies.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'admin',
		component: AdminComponent,
		children: [
			{
				path: 'movies',
				component: MoviesComponent
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
	exports: [RouterModule],
	declarations: []
})
export class RoutesModule { }
