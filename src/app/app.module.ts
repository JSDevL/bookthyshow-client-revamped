import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './shared/routes/routes.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { MoviesComponent } from './admin/movies/movies.component';
import { TheatresComponent } from './admin/theatres/theatres.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NotFoundComponent,
		AdminComponent,
		MoviesComponent,
		TheatresComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RoutesModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
