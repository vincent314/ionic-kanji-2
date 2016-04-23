import {Page} from 'ionic-angular';
import {KanjiService} from "../../services/kanji.service";
import {Platform} from 'ionic-angular';

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
            if(window.plugins) {
                window.plugins.toast.show(message, "short", position);
            }
        });
    }
}