import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HistoryService
{
	key: string = "historyList";
	subject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

	constructor(private storage: Storage)
	{
		storage.create().then(() => {
			this.storage.get(this.key).then(entries => {
				this.subject.next(entries);
			});
		});
	}

	async addEntry(word: string)
	{
		const list: string[] = (await this.storage.get(this.key) || []);
		list.push(word);
		await this.storage.set(this.key, list);
		this.subject.next(list);
	}

	async clear()
	{
		await this.storage.remove(this.key);
		this.subject.next([]);
	}

	getEntries()
	{
		return this.subject.asObservable();
	}
}
