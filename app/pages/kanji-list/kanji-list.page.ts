import {Page} from 'ionic-angular';
import {KanjiService} from "../../services/kanji.service";
import {mm} from "../../mm/mm";
import Kanji = mm.Kanji;
import {NavController} from 'ionic-angular';
import {KanjiDetailsPage} from "../kanji-details/kanji-details.page";
import {Searchbar} from 'ionic-angular';
import {SearchbarInput} from 'ionic-angular';
import * as _ from 'lodash';

@Page({
    templateUrl: 'build/pages/kanji-list/kanji-list.html',
})
export class KanjiListPage {
    public kanjis:Kanji[];
    public filtered:Kanji[];
    public searchQuery:string;

    constructor(public kanjiService:KanjiService, public nav:NavController) {
        this.kanjis = [];
        this.searchQuery = '';
        kanjiService.getKanjiList().then((kanjis:Kanji[])=> {
            this.kanjis = kanjis;
            this.filtered = kanjis;
        });
    }

    public onDetails(kanji:Kanji):void {
        this.nav.push(KanjiDetailsPage, {kanji: kanji});
    }

    public search(searchbar) {
        this.filtered = this.kanjiService.search(this.kanjis, searchbar.value);
    }
}
