import {Injectable} from '@angular/core';
import {MappingsService} from '../services/mappings.service';
import {Mapping} from '../models/mapping.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MappingsResolveService implements Resolve<Mapping[]> {

    constructor(private mappingsService: MappingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mapping[]> | Promise<Mapping[]> | Mapping[] {
        return this.mappingsService.getMappings(route.queryParams);
    }

}
