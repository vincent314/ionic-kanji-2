import {Page} from 'ionic-angular';
import {KanjiService} from "../../services/kanji.service";
import {mm} from "../../mm/mm";
import Kanji = mm.Kanji;
@Page({
    templateUrl: 'build/pages/tesuto/tesuto.html'
})
export class TesutoPage {
    type:string;
    kanji:Kanji;

    constructor(public kanjiService:KanjiService) {
        this.type = 'kanji';
        this.updateView();
    }

    public updateView() {
        this.kanjiService.getRandomKanji().then((kanji:Kanji)=> {
            this.kanji = kanji;
        });
    }
}