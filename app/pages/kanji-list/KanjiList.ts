import {Page} from 'ionic-framework/ionic';
import {KanjiService} from "../../services/kanji.service";
import Kanji = mm.Kanji;
import {TranslatePipe} from 'angular2-translate';

@Page({
    templateUrl: 'build/pages/kanji-list/kanji-list.html',
    pipes:[TranslatePipe]
})
export class KanjiList {
    public kanjis:Kanji[];

    constructor(public kanjiService:KanjiService) {
        this.kanjis = [];
        kanjiService.getKanjiList().subscribe((kanjis:Kanji[])=> {
            this.kanjis = kanjis;
        });
    }
}
