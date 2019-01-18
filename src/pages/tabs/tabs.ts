import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { ComingSoonPage } from '../coming-soon/coming-soon';
import { DownloadsPage } from '../downloads/downloads';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ComingSoonPage;
  tab4Root = DownloadsPage;
  tab5Root = ProfilePage;

  constructor() {
  }
}
