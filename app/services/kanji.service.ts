/// <reference path="../../typings/tsd.d.ts" />
///<reference path="../mm/mm.d.ts" />

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {LocalStorage} from 'angular2-local-storage/local_storage';

class KanjiKana {
    kanji:string;
    kana:string;
}

@Injectable()
export class KanjiService {
    $q:IQService;
    $ionicLoading:IonicLoadingService;

    constructor(public http:Http,
                public config:config.Config,
                public localStorage:LocalStorage,
                $q:Q,
                $ionicLoading:IonicLoadingService) {
        this.http = http;
        this.config = config;
        this.localStorage = localStorage;
        this.$q = $q;
        this.$ionicLoading = $ionicLoading;
    }

    public getKanjiList():IPromise<Kanji[]> {
        var kanjis:Kanji[] = this.localStorage.get<Kanji[]>('kanji-list');

        if (kanjis) {
            console.log("Kanji list found in localstorage (%d)", kanjis.length);
            return this.$q.when<Kanji[]>(kanjis);
        }

        var dataUrl:string = this.config.kanji.dataUrl;

        // Open loading popin
        this.$ionicLoading.show();

        return this.http.get<Kanji[]>(dataUrl)
            .then((res)=> {
                // Close Loading popin
                this.$ionicLoading.hide();

                var kanjis:Kanji[] = res.data;
                console.log("%d kanjis read from %s", kanjis.length, dataUrl);
                this.localStorage.set('kanji-list', kanjis);
                return kanjis;
            })
            .catch((err:Error)=> {
                console.log(err);
                this.$ionicLoading.hide();
                return [];
            });
    }

    public invalidCache():void {
        this.localStorage.remove('kanji-list');
    }


    public diff(reading:string, withKanji:string):string {
        var diffResult:IDiffResult[] = JsDiff.diffChars(withKanji, reading);
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
