import {Page} from 'ionic-framework/ionic';
import {KanjiListPage} from '../kanji-list/kanji-list.page';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';
import {SettingsPage} from "../settings/settings.page";


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  kanjiListRoot: Type = KanjiListPage;
  settingsRoot: Type = SettingsPage;

  constructor() {

  }
}
