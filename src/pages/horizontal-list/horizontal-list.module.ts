import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HorizontalListPage } from './horizontal-list';

@NgModule({
  declarations: [
    HorizontalListPage,
  ],
  imports: [
    IonicPageModule.forChild(HorizontalListPage),
  ],
})
export class HorizontalListPageModule {}
