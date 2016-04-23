import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {KanjiService} from './services/kanji.service';
import {ConfigService} from './config/config';
import {HTTP_PROVIDERS} from 'angular2/http';


@App({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
    providers: [KanjiService,HTTP_PROVIDERS,ConfigService]
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
