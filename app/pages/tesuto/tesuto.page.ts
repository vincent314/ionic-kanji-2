import {Page, Events} from 'ionic-angular';
import {KanjiService} from "../../services/kanji.service";
import {Kanji} from "../../mm/mm";
import {Input} from "angular2/core";
import {Platform} from "ionic-angular";
import {TestKanjiComponent} from './testkanji.component';
import {TestReadingComponent} from './testreading.component';
@Page({
    templateUrl: 'build/pages/tesuto/tesuto.html',
    directives: [TestKanjiComponent,TestReadingComponent]
})
export class TesutoPage {
    type:string;
    kanji:Kanji;
    question:string;
    goal:string[];
    success:string[];
    @Input() answer:string;

    constructor(public kanjiService:KanjiService, public platform:Platform) {
        this.type = 'kanji';
        this.updateKanji();
    }


    public checkKanjiAnswer(answer:string):boolean {
        return answer === this.kanji.kanji;
    }

    public checkReadingAnswer(answer:string):boolean {
        // _.goal.find((item:string)=>{
        //     return
        // });
        return true;
    }

    // public checkAnswer(answer:string):boolean {
    //     switch (this.type) {
    //         case 'kanji':
    //             return this.checkKanjiAnswer(answer);
    //         case 'reading':
    //             return this.checkReadingAnswer(answer);
    //     }
    // }

    // public onSubmit() {
    //     if (this.checkAnswer(this.answer)) {
    //         this.showToast('Bonne réponse', 'top');
    //         this.updateKanji();
    //     } else {
    //         this.showToast('Mauvaise réponse', 'top');
    //     }
    // }

    public onSegmentChange(event:Events) {
        this.updateKanji();
    }

    public updateKanji() {
        this.kanjiService.getRandomKanji().then((kanji:Kanji)=> {
            this.kanji = kanji;
            // this.answer = null;
            // this.question = kanji.meaning;
        });
    }

    // showToast(message:string, position:string) {
    //     this.platform.ready().then(() => {
    //         if (window.plugins) {
    //             window.plugins.toast.show(message, "short", position);
    //         } else {
    //             console.log('Toast %s', message);
    //         }
    //     });
    // }
}