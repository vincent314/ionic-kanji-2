export class Vocabulary {
    comment:string;
    japanese:string;
    reading:string;
    meaning:string;
}

export class Kanji {
    kanji:string;
    meaning:string;
    writing:string;
    readings:string[];
    vocabulary:Vocabulary[];
}