import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Theatre} from '../../../shared/models/theatre.model';
import {TheatresService} from 'app/shared/services/theatres.service';
import {NgForm} from '@angular/forms';
import * as _ from 'underscore';
import {City} from '../../../shared/models/city.model';

@Component({
    selector: 'app-manage-theatres',
    templateUrl: './manage-theatres.component.html',
    styleUrls: ['./manage-theatres.component.scss']
})
export class ManageTheatresComponent implements OnInit, OnDestroy {

    @ViewChild('newTheatreForm')
    newTheatreForm: NgForm;

    @Input('selectedTheatre')
    selectedTheatre: Theatre;

    @Output()
    selectTheatre = new EventEmitter<Theatre>();

    @Input('selectedCity')
    selectedCity: City;

    public theatres: Theatre[] = [];
    theatresSubscription: Subscription;

    constructor(private theatresService: TheatresService) {
    }

    ngOnInit() {
        this.theatresSubscription = this.theatresService.theatres$.subscribe((theatres: Theatre[]) => {
            this.theatres = theatres;
        });
    }

    postTheatre(): void {
        this.theatresService.postTheatre(this.newTheatreForm.value).subscribe((theatre: Theatre) => {
            // send new instance for pipes to detect
            this.theatresService.theatresSource.next([
                ...this.theatres,
                theatre
            ]);

            this.newTheatreForm.reset();

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
