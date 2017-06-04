import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import * as _ from 'underscore';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    public message;
    private router;

    constructor(private injector: Injector) {
    }

    handleError(error: any): void {
        this.router = this.injector.get(Router);

        if (_.isMatch(error, {'name': 'ValidationError'})) {
            const message = _.reduce(error['errors'], function (memo, validationError) {
                return memo + validationError['message'] + ' ';
            }, '');

            return alert(message);
        }

        this.message = error.message || error.toString();

        this.router.navigate(['error'], {
            queryParams: {
                message: this.message
            }
        });

        throw error;
    }
}
