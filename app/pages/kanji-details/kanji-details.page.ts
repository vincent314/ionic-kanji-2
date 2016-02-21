import {Page} from "ionic-framework/ionic";
import Kanji = mm.Kanji;
import {Input} from "angular2/core";
import {NavParams} from "ionic-framework/ionic";
import {KanjiService} from "../../services/kanji.service";

@Page({
    templateUrl: 'build/pages/kanji-details/kanji-details.html'
})
export class KanjiDetailsPage{
    kanji:Kanji;
    constructor(navParams:NavParams,public kanjiService:KanjiService){
        this.kanji = navParams.get('kanji');
    }

    public renderWithFurigana(japanese:string, reading:string):any{
        return this.kanjiService.diff(japanese,reading);
    }
}