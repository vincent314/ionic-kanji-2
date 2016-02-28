///<reference path="../config/config.d.ts" />

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {mm} from '../mm/mm';
import Kanji = mm.Kanji;
import {Response} from 'angular2/http';
import {Observable} from "rxjs/Rx";
import IDiffResult = JsDiff.IDiffResult;
import {ConfigService} from "../config/config";
import Config = config.Config;
import * as _ from 'lodash';
import {Storage, SqlStorage} from "ionic-framework/ionic";
var wanakana = require('wanakana');

var diff = require('diff/dist/diff');

class KanjiKana {
    kanji:string;
    kana:string;
}

@Injectable()
export class KanjiService {
    private config:Config;
    private storage:Storage;

    constructor(public http:Http,
                public configService:ConfigService) {
        this.http = http;
        this.config = configService.getConfig();
    }

    public getKanjiList():Promise<Array<Kanji>> {
        //this.storage = new Storage(SqlStorage,{});
        var storage:Storage = new Storage(SqlStorage, {});
        return storage.get('kanji-list').then((kanjiListStr:string)=> {
            if (kanjiListStr) {
                var kanjis:Array<Kanji> = JSON.parse(kanjiListStr);
                console.log("Kanji list found in storage (%d)", kanjis.length);
                return new Promise((resolve)=>resolve(kanjis));
            } else {
                var dataUrl:string = this.config.kanji.dataUrl;

                // Open loading popin
                //this.$ionicLoading.show();

                return new Promise((resolve)=> {
                    this.http.get(dataUrl).subscribe((res:Response)=> {
                        var kanjis:Array<Kanji> = res.json();
                        console.log("%d kanjis read from %s", kanjis.length, dataUrl);
                        storage.set('kanji-list', JSON.stringify(kanjis));
                        resolve(kanjis);
                    })
                });
            }
        });
    }

    public getRandomKanji():Promise<Kanji> {
        return this.getKanjiList().then((kanjis:Array<Kanji>)=> {
            return _.sample(kanjis);
        });
    }

    public static invalidCache():void {
        new Storage(SqlStorage, {}).remove('kanji-list');
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

    public search(kanjis:Array<Kanji>, q:string) {
        console.log('search on query string : %s', q);
        if (q === '') {
            return kanjis;
        }

        return kanjis.filter((k:Kanji)=> {
            if (k.kanji === q) {
                return true;
            }
            if (k.meaning.indexOf(q) > -1) {
                return true;
            }
            return k.readings.filter((r:string)=> {
                    return wanakana.toRomaji(r) === wanakana.toRomaji(q);
                }).length > 0;
        });
    }
}
