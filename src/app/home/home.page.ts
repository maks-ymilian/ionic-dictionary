import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface DictionaryPhonetics
{
	text: string;
	audio: string;
	sourceUrl: string;
}

interface DictionaryDefinition
{
	definition: string;
	synonyms: string[];
	antonyms: string[];
}

interface DictionaryMeaning
{
	partOfSpeech: string;
	definitions: DictionaryDefinition[];
	synonyms: string[];
	antonyms: string[];
}

interface DictionaryEntry
{
	word: string;
	phonetics: DictionaryPhonetics[];
	meanings: DictionaryMeaning[];
	sourceUrls: string[];
}

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule],
})
export class HomePage
{
	inputText: string = "input";
	result: string = "result";

	constructor(private router: Router, private http: HttpClient) {}

	submit()
	{
		this.result = "...";
		this.http.get<DictionaryEntry[]>("https://api.dictionaryapi.dev/api/v2/entries/en/" + this.inputText).subscribe(res => {
			this.result = res[0].meanings[0].definitions[0].definition;
		});
	}

	goToNextPage()
	{
		this.router.navigate(['/other-page']);
	}
}
