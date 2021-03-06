import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
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
import {SelectSeatsComponent} from './booking/select-seats/select-seats.component';
import {SeatsGridComponent} from './booking/select-seats/seats-grid/seats-grid.component';
import {NumToCharPipe} from './shared/pipes/num-to-char.pipe';
import {BookingOverviewComponent} from './booking/select-seats/booking-overview/booking-overview.component';
import {PaymentComponent} from './booking/payment/payment.component';
import {CheckComponent} from './check/check.component';
import {AboutComponent} from './about/about.component';

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
        SelectDateTimeComponent,
        SelectSeatsComponent,
        SeatsGridComponent,
        NumToCharPipe,
        BookingOverviewComponent,
        PaymentComponent,
        CheckComponent,
        AboutComponent
    ],
    imports: [
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
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
