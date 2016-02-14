declare module mm {
  interface Vocabulary {
    comment:string;
    japanese:string;
    reading:string;
    meaning:string;
  }

  interface Kanji {
    kanji:string;
    meaning:string;
    writing:string;
    readings:string[];
    vocabulary:Vocabulary[];
  }
}
