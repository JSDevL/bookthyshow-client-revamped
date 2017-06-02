import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'underscore';

import {City} from '../../shared/models/city.model';
import {Theatre} from '../../shared/models/theatre.model';

import {TheatresService} from '../../shared/services/theatres.service';

@Component({
    selector: 'app-theatres',
    templateUrl: './theatres.component.html',
    styleUrls: ['./theatres.component.scss'],
})
export class TheatresComponent implements OnInit, OnDestroy {

    @ViewChild('newTheatreForm')
    newTheatreForm: NgForm;

    public selectedCity: City;

    public theatres: Theatre[] = [];
    theatresSubscription: Subscription;

    constructor(private theatresService: TheatresService) {
    }

    ngOnInit() {
        this.theatresSubscription = this.theatresService.theatres$.subscribe((theatres: Theatre[]) => {
            this.theatres = theatres;
        });
    }

    onSelectedCity(city): void {
        this.selectedCity = city;
    }

    postTheatre(): void {
        this.theatresService.postTheatre(this.newTheatreForm.value).subscribe((theatre: Theatre) => {
            // send new instance for pipes to detect
            this.theatresService.theatresSource.next([
                ...this.theatres,
                theatre
            ]);

            alert('Theatre added.');
        });
    }

    deleteTheatre(theatreToDelete: Theatre): void {
        this.theatresService.deleteTheatre(theatreToDelete._id).subscribe(() => {
            this.theatresService.theatresSource.next(
                _.reject(this.theatres, (theatre: Theatre) => theatre._id === theatreToDelete._id
                ));

            alert('Theatre deleted.');
        });
    }

    ngOnDestroy() {
        this.theatresSubscription.unsubscribe();
    }
}
