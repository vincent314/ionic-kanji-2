import {Page} from "ionic-framework/ionic";
import {KanjiService} from "../../services/kanji.service";
import Kanji = mm.Kanji;
@Page({
    templateUrl:'build/pages/tesuto/tesuto.html'
})
export class TesutoPage{
    type:string;
    kanji:Kanji;

    constructor(public kanjiService:KanjiService){
        this.type = 'kanji';
    }

    public updateView(){
        this.kanjiService.getRandomKanji().then((kanji:Kanji)=>{
            this.kanji = kanji;
        });
    }
}