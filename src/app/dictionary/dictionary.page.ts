import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { DictionaryEntry } from '../dictionary-types';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HistoryService } from '../history.service'
import { Clipboard } from '@capacitor/clipboard';

@Component({
	selector: 'app-dictionary',
	templateUrl: './dictionary.page.html',
	styleUrls: ['./dictionary.page.scss'],
	standalone: true,
	imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule, IonText]
})
export class DictionaryPage implements OnInit
{
	public searchText: string = "";
	public entry: DictionaryEntry | null = null;

	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public history: HistoryService) {}

	ngOnInit()
	{
		const word: string | null = this.route.snapshot.paramMap.get('word');
		if (word !== null)
		{
			this.http.get<DictionaryEntry[]>("https://api.dictionaryapi.dev/api/v2/entries/en/" + word).subscribe(res =>
			{
				if (res.length != 0)
				{
					this.entry = res[0];
					this.history.addEntry(word);
				}
			});
		}
	}

	search()
	{
		this.router.navigateByUrl(`/dictionary/${this.searchText}`, { replaceUrl: true });
	}

	copy(string: string)
	{
		Clipboard.write({ string: string });
	}
}
