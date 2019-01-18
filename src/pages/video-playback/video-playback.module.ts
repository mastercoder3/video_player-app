import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPlaybackPage } from './video-playback';

@NgModule({
  declarations: [
    VideoPlaybackPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoPlaybackPage),
  ],
})
export class VideoPlaybackPageModule {}
