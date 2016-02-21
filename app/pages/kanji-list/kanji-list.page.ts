import {Page} from 'ionic-framework/ionic';
import {KanjiService} from "../../services/kanji.service";
import Kanji = mm.Kanji;
import {NavController} from "ionic-framework/ionic";
import {KanjiDetailsPage} from "../kanji-details/kanji-details.page";

@Page({
    templateUrl: 'build/pages/kanji-list/kanji-list.html',
})
export class KanjiListPage {
    public kanjis:Kanji[];

    constructor(public kanjiService:KanjiService, public nav:NavController) {
        this.kanjis = [];
        kanjiService.getKanjiList().subscribe((kanjis:Kanji[])=> {
            this.kanjis = kanjis;
        });
    }

    public onDetails(kanji:Kanji):void{
        this.nav.push(KanjiDetailsPage,{kanji:kanji});
    }
}
