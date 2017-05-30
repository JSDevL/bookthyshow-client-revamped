import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	public message;
	private router;

	constructor(private injector: Injector) {}

	handleError(error: Error): void {
		this.router = this.injector.get(Router);

		this.message = error.message || error.toString();

		this.router.navigate(['error'], { queryParams: {
			message: this.message
		}});

		throw error;
	}
}
