import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalErrorHandler } from '../shared/services/error-handler.service';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

	public message = 'Generic Error Message';

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.message = this.route.snapshot.queryParams['message'] ? this.route.snapshot.queryParams['message'] : this.message;
	}

}
