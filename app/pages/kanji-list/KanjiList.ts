import {Page} from 'ionic-framework/ionic';
import {KanjiService} from "../../services/kanji.service";
//import Kanji = mm.Kanji;


@Page({
    templateUrl: 'build/pages/kanji-list/kanji-list.html',
})
export class KanjiList {
    //public kanjis:Kanji[];

    //constructor(public kanjiService:KanjiService) {
    //    this.kanjis = [];
    //    kanjiService.getKanjiList().then((kanjis:Kanji[])=> {
    //        this.kanjis = kanjis;
    //    });
    //}
    constructor() {
    }
}
