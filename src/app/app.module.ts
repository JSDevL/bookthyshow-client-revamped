import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RoutesModule} from './shared/routes/routes.module';

import {GlobalErrorHandler} from './shared/services/error-handler.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AdminComponent} from './admin/admin.component';
import {MoviesComponent} from './admin/movies/movies.component';
import {TheatresComponent} from './admin/theatres/theatres.component';
import {MovieSearchComponent} from './admin/movies/movie-search/movie-search.component';
import {ErrorComponent} from './error/error.component';
import {CitiesComponent} from './admin/theatres/manage-cities/manage-cities.component';
import {FilterPipe} from './shared/pipes/filter.pipe';
import {ManageTheatresComponent} from './admin/theatres/manage-theatres/manage-theatres.component';
import {ManageMappingsComponent} from './admin/theatres/manage-mappings/manage-mappings.component';
import {BookingComponent} from './booking/booking.component';
import {UniqPipe} from './shared/pipes/uniq.pipe';
import {SelectDateTimeComponent} from './booking/select-date-time/select-date-time.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        AdminComponent,
        MoviesComponent,
        TheatresComponent,
        MovieSearchComponent,
        ErrorComponent,
        CitiesComponent,
        FilterPipe,
        ManageTheatresComponent,
        ManageMappingsComponent,
        BookingComponent,
        UniqPipe,
        SelectDateTimeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RoutesModule
    ],
    providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
