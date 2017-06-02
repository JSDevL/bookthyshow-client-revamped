import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Theatre} from '../models/theatre.model';

import {TheatresService} from '../services/theatres.service';

@Injectable()
export class TheatresResolveService implements Resolve<Theatre[]> {

    constructor(private theatresService: TheatresService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Theatre[]> | Promise<Theatre[]> | Theatre[] {
        return this.theatresService.getTheatres();
    }

}
