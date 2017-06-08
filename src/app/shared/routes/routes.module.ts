import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from '../../home/home.component';
import {NotFoundComponent} from '../../not-found/not-found.component';
import {AdminComponent} from '../../admin/admin.component';
import {MoviesComponent} from '../../admin/movies/movies.component';
import {TheatresComponent} from '../../admin/theatres/theatres.component';
import {ErrorComponent} from '../../error/error.component';
import {BookingComponent} from '../../booking/booking.component';

import {MoviesService} from '../services/movies.service';
import {MoviesResolveService} from './movies-resolve.service';
import {CitiesService} from '../services/cities.service';
import {CitiesResolveService} from './cities-resolve.service';
import {TheatresService} from '../services/theatres.service';
import {TheatresResolveService} from './theatres-resolve.service';
import {MappingsService} from '../services/mappings.service';
import {MappingsResolveService} from './mappings-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            mappings: MappingsResolveService,
            cities: CitiesResolveService
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        resolve: {
            movies: MoviesResolveService,
            cities: CitiesResolveService,
            theatres: TheatresResolveService,
            mappings: MappingsResolveService
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
        path: 'booking',
        component: BookingComponent,
        resolve: {
            'mappings': MappingsResolveService
        }
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
        CommonModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        MoviesResolveService,
        MoviesService,
        CitiesResolveService,
        CitiesService,
        TheatresResolveService,
        TheatresService,
        MappingsResolveService,
        MappingsService
    ],
    declarations: []
})
export class RoutesModule {
}
