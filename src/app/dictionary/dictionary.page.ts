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
import { Toast } from '@capacitor/toast';
import { NativeAudio } from '@capacitor-community/native-audio'

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
		this.initEntry();
	}

	async initEntry()
	{
		let word: string | null | undefined = this.route.snapshot.paramMap.get('word');

		// if the url is random-word set word to a random word from an api
		const random: boolean = word === "random-word";
		if (random)
			word = await this.http.get<string>("https://random-word-api.vercel.app/api?words=1").toPromise();

		if (word !== null && word !== undefined)
		{
			this.http.get<DictionaryEntry[]>("https://api.dictionaryapi.dev/api/v2/entries/en/" + word).subscribe({
				next: res =>
				{
					if (res.length == 0)
					{
						this.navigateToError();
						return;
					}

					this.entry = res[0];
					this.history.addEntry(word);
				},
				error: res =>
				{
					if (random) // if random word doesnt exist in dictionary, try again
						this.initEntry();
					else
						this.navigateToError();
				},
			});
		}
	}

	navigateToError()
	{
		this.router.navigateByUrl("/dictionary/error", { replaceUrl: true });
	}

	search()
	{
		this.router.navigateByUrl(`/dictionary/${this.searchText}`, { replaceUrl: true });
	}

	copy(string: string)
	{
		Clipboard.write({ string: string });
		Toast.show({ text: "Copied definition to clipboard" });
	}

	playSound(url: string)
	{
		NativeAudio.preload({
			assetId: "speech",
			assetPath: url,
			audioChannelNum: 1,
			isUrl: true,
		});

		NativeAudio.play({ assetId: 'speech' });
		NativeAudio.unload({ assetId: 'speech' });
	}
}
