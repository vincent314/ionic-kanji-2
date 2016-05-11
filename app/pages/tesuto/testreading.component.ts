import {Component, Input} from 'angular2/core';
import {Kanji} from '../../mm/mm';
import {AnswerComponent} from './answer.component';
@Component({
    selector:'test-reading',
    template: `<p>Quelles sont les lectures de {{kanji.kanji}}</p>
                <answer [submit]="submit"></answer>`,
    directives: [AnswerComponent]
})
export class TestReadingComponent{
    @Input()
    kanji:Kanji;

    constructor(){};

    public submit(answer){
        console.log(`submit reading ${answer}`);
    }
}