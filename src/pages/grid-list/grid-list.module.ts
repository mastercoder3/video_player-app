import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GridListPage } from './grid-list';

@NgModule({
  declarations: [
    GridListPage,
  ],
  imports: [
    IonicPageModule.forChild(GridListPage),
  ],
})
export class GridListPageModule {}
