import {Page} from 'ionic-framework/ionic';
import {KanjiListPage} from '../kanji-list/kanji-list.page';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  kanjiListRoot: Type = KanjiListPage;
  tab2Root: Type = Page2;
  tab3Root: Type = Page3;

  constructor() {

  }
}
