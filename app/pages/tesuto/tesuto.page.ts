import {Page} from 'ionic-angular';
import {KanjiService} from "../../services/kanji.service";
import {mm} from "../../mm/mm";
import Kanji = mm.Kanji;
import {Input} from "angular2/core";
import {TesutoEnum} from "./TesutoEnum";
import {Platform} from "ionic-angular";
@Page({
    templateUrl: 'build/pages/tesuto/tesuto.html'
})
export class TesutoPage {
    type:string;
    kanji:Kanji;
    question:string;
    @Input() answer:string;

    constructor(public kanjiService:KanjiService, public platform:Platform) {
        this.type = 'kanji';
        this.updateKanji();
    }

    public updateKanji() {
        this.kanjiService.getRandomKanji().then((kanji:Kanji)=> {
            this.kanji = kanji;
            this.answer = null;

            switch(this.type){
                case 'kanji':
                    this.question = kanji.meaning;
                    break;
                case 'reading':
                    this.question = kanji.kanji;
                    break;
            }
        });
    }

    public checkKanjiAnswer(answer:string):boolean{
        return answer === this.kanji.kanji;
    }

    public checkReadingAnswer(answer:string):boolean{
        // TODO
        return true;
    }

    public checkAnswer(answer:string):boolean{
        switch(this.type){
            case 'kanji':
                return this.checkKanjiAnswer(answer);
            case 'reading':
                return this.checkReadingAnswer(answer);
        }
    }

    public onSubmit() {
        if(this.checkAnswer(this.answer)){
            this.showToast('Bonne réponse', 'top');
            this.updateKanji();
        } else {
            this.showToast('Mauvaise réponse', 'top');
        }
    }

    showToast(message:string, position:string) {
        this.platform.ready().then(() => {
            if(window.plugins) {
                window.plugins.toast.show(message, "short", position);
            }else {
                console.log('Toast %s',message);
            }
        });
    }
}