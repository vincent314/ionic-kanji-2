import {Page} from "ionic-framework/ionic";
import {KanjiService} from "../../services/kanji.service";
import {Platform} from "ionic-framework/ionic";

@Page({
    templateUrl:'build/pages/settings/settings.html'
})
export class SettingsPage{
    constructor(public platform:Platform){
    }

    invalidCache():void{
        KanjiService.invalidCache();
        this.showToast('Les caches ont été vidés', 'top');
    }

    showToast(message:string, position:string) {
        this.platform.ready().then(() => {
            window.plugins.toast.show(message, "short", position);
        });
    }
}