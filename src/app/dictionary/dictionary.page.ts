import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { DictionaryEntry } from '../dictionary-types';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-dictionary',
	templateUrl: './dictionary.page.html',
	styleUrls: ['./dictionary.page.scss'],
	standalone: true,
	imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DictionaryPage implements OnInit
{
	public entry: DictionaryEntry | null = null;

	constructor(private route: ActivatedRoute, private http: HttpClient) {}

	ngOnInit()
	{
		const word: string | null = this.route.snapshot.paramMap.get('word');
		this.http.get<DictionaryEntry[]>("https://api.dictionaryapi.dev/api/v2/entries/en/" + word).subscribe(res =>
		{
			if (res.length != 0)
				this.entry = res[0];
			else
			{
			}
		});
	}
}
