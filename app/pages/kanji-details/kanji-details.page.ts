import {Page} from "ionic-angular";
import {NavParams} from "ionic-angular";
import {KanjiService} from "../../services/kanji.service";
import {Kanji} from '../../mm/mm';

@Page({
    templateUrl: 'build/pages/kanji-details/kanji-details.html'
})
export class KanjiDetailsPage {
    kanji:Kanji;

    constructor(navParams:NavParams, public kanjiService:KanjiService) {
        this.kanji = navParams.get('kanji');
    }

    public renderWithFurigana(japanese:string, reading:string):any {
        return this.kanjiService.diff(japanese, reading);
    }
}