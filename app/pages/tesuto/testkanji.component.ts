import {Component, Input} from 'angular2/core';
import {KanjiService} from '../../services/kanji.service';
import {Platform} from 'ionic-angular/index';
import {Kanji} from '../../mm/mm';
import {AnswerComponent} from './answer.component';
@Component({
    selector: 'test-kanji',
    template: `<p>Quel est le Kanji de :</p>
                <p>{{kanji.meaning}}</p>
                <answer [submit]="submit"></answer>`,
    directives: [AnswerComponent]
})
export class TestKanjiComponent {
    @Input()
    kanji:Kanji;
    public answer:string;
    public question:string;

    constructor(public kanjiService:KanjiService, public platform:Platform) {
        this.updateKanji()
    }

    public updateKanji() {
        this.kanjiService.getRandomKanji().then((kanji:Kanji)=> {
            this.kanji = kanji;
            this.answer = null;
            this.question = kanji.meaning;
        });
    }
    
    public submit(answer){
        console.log(`submit Kanji ${answer}`);
    }
}