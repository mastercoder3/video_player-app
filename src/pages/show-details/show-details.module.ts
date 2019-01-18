import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowDetailsPage } from './show-details';

@NgModule({
  declarations: [
    ShowDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowDetailsPage),
  ],
})
export class ShowDetailsPageModule {}
