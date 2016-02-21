import {Page} from "ionic-framework/ionic";
import {KanjiService} from "../../services/kanji.service";

@Page({
    templateUrl:'build/pages/settings/settings.html'
})
export class SettingsPage{
    constructor(public kanjiService:KanjiService){
    }

    public invalidCache():void{
        this.kanjiService.invalidCache();
    }
}