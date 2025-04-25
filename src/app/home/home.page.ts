import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule],
})
export class HomePage
{
	searchText: string = "";

	constructor(private router: Router) {}

	search()
	{
		this.router.navigate(['/dictionary', this.searchText]);
	}

	randomWord()
	{
		this.router.navigate(['/dictionary/random-word']);
	}

	goToHistory()
	{
		this.router.navigate(['/history']);
	}
}
