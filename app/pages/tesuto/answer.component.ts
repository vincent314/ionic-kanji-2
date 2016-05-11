import {Component, Input} from 'angular2/core';
@Component({
    selector: 'answer',
    template: `<ion-list>
        <ion-item>
            <ion-label floating>Réponse</ion-label>
            <ion-input type="text" name="answer" placeholder [(ngModel)]="answer"></ion-input>
            <button clear (click)="submit(answer)" item-right>
                <ion-icon name="send"></ion-icon>
            </button>
        </ion-item>
    </ion-list>`
})
export class AnswerComponent {
    @Input()
    public submit:Function;
    public answer:string;
}