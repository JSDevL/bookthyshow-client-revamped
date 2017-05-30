import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	@ViewChild('mainOutlet')
	mainOutlet: ElementRef;

	ngOnInit() {
		this.mainOutlet.nativeElement.style.minHeight = ( window.innerHeight - 50 ) + 'px';
	}
}
