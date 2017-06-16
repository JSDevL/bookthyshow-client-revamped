import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SelectDateTimeGuardService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (route.queryParams['theatre.city_id'] && route.queryParams['movie._id']) {
            return true;
        } else {
            this.router.navigate(['/']);
        }
    }
}
