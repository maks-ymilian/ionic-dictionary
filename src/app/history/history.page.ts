import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/angular/standalone';
import { HistoryService } from '../history.service'
import { Router } from '@angular/router';

@Component({
	selector: 'app-history',
	templateUrl: './history.page.html',
	styleUrls: ['./history.page.scss'],
	standalone: true,
	imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonText]
})
export class HistoryPage implements OnInit
{
	constructor(private router: Router, public history: HistoryService) {}

	ngOnInit() {}

	clear()
	{
		this.history.clear();
	}

	navigateToWord(word: string)
	{
		this.router.navigateByUrl(`/dictionary/${word}`, { replaceUrl: true });
	}
}
