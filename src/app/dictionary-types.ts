export interface DictionaryPhonetics
{
	text: string;
	audio: string;
	sourceUrl: string;
}

export interface DictionaryDefinition
{
	definition: string;
	synonyms: string[];
	antonyms: string[];
	example: string;
}

export interface DictionaryMeaning
{
	partOfSpeech: string;
	definitions: DictionaryDefinition[];
	synonyms: string[];
	antonyms: string[];
}

export interface DictionaryEntry
{
	word: string;
	phonetics: DictionaryPhonetics[];
	meanings: DictionaryMeaning[];
	sourceUrls: string[];
}
