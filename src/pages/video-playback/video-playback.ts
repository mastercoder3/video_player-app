import { Component } from "@angular/core";
import { IonicPage, ViewController, LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-video-playback",
  templateUrl: "video-playback.html"
})
export class VideoPlaybackPage {
  showControls: boolean = false;
  isPlaying: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad VideoPlaybackPage");

    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading..."
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();

      this.playPause();
      this.showVideoControls();
    }, 2000);
  }

  showVideoControls() {
    if (!this.showControls) {
      this.showControls = true;

      setTimeout(() => {
        this.showControls = false;
      }, 5000);
    }
  }

  playPause() {
    let video: HTMLMediaElement = document.getElementById(
      "video"
    ) as HTMLMediaElement;
    console.log(video);

    if (video) {
      if (this.isPlaying) {
        video.pause();
      } else {
        video.play();
      }

      this.isPlaying = !this.isPlaying;
    }
  }

  goBack() {
    this.viewCtrl.dismiss();
  }
}
