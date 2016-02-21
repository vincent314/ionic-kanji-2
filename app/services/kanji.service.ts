///<reference path="../mm/mm.d.ts" />
///<reference path="../config/config.d.ts" />

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {LocalStorage} from 'angular2-local-storage/local_storage';
import Kanji = mm.Kanji;
import {Response} from 'angular2/http';
import {Observable} from "rxjs/Rx";
import IDiffResult = JsDiff.IDiffResult;
import {ConfigService} from "../config/config";
import Config = config.Config;
import * as _ from 'lodash';

var diff = require('diff/dist/diff');

class KanjiKana {
    kanji:string;
    kana:string;
}

@Injectable()
export class KanjiService {
    private config:Config;

    constructor(public http:Http,
                public configService:ConfigService,
                public localStorage:LocalStorage) {
        this.http = http;
        this.config = configService.getConfig();
        this.localStorage = localStorage;
    }

    public getKanjiList():Observable<Kanji[]> {
        var kanjis:Kanji[] = this.localStorage.getObject('kanji-list');

        if (!_.isEmpty(kanjis)) {
            console.log("Kanji list found in localstorage (%d)", kanjis.length);
            return Observable.of(kanjis);
        }

        var dataUrl:string = this.config.kanji.dataUrl;

        // Open loading popin
        //this.$ionicLoading.show();

        return this.http.get(dataUrl)
            .map((res:Response) => {
                var kanjis:Kanji[] = res.json();
                console.log("%d kanjis read from %s", kanjis.length, dataUrl);
                this.localStorage.setObject('kanji-list', kanjis);
                return kanjis;
            });
    }

    public invalidCache():void {
        this.localStorage.remove('kanji-list');
    }


    public diff(reading:string, withKanji:string):string {
        var diffResult:IDiffResult[] = diff.diffChars(withKanji, reading);
        var kanjiKanaList:Array<KanjiKana|string> = [];

        var current:KanjiKana = new KanjiKana();

        _.each(diffResult, (part:IDiffResult)=> {
            if (!part.removed && !part.added) {
                current = new KanjiKana();
                kanjiKanaList.push(part.value);
                return;
            }

            if (part.removed) {
                current.kanji = part.value;
            } else if (part.added) {
                current.kana = part.value;
            }

            if (current.kana && current.kanji) {
                kanjiKanaList.push(current);
                current = new KanjiKana();
            }
        });

        return _.reduce<(KanjiKana|string),string>(kanjiKanaList, (memo:string, item:(KanjiKana|string))=> {
            if (item instanceof KanjiKana) {
                var furigana = `<ruby>${item.kanji}<rt>${item.kana}</rt></ruby>`;
                return memo + furigana;
            } else {
                return memo + item;
            }
        }, '');
    }
}
