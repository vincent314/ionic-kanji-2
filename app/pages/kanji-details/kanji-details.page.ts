import {Page} from "ionic-framework/ionic";
import Kanji = mm.Kanji;
import {Input} from "angular2/core";
import {NavParams} from "ionic-framework/ionic";

@Page({
    templateUrl: 'build/pages/kanji-details/kanji-details.html'
})
export class KanjiDetailsPage{
    kanji:Kanji;
    constructor(navParams:NavParams){
        this.kanji = navParams.get('kanji');
    }
}