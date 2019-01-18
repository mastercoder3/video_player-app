import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController
} from "ionic-angular";
import {
  StreamingVideoOptions,
  StreamingMedia
} from "@ionic-native/streaming-media";

import { DownloadService } from "../../services/DownloadService";
import { DownloadItem } from "../../data/DownloadItem";

@IonicPage()
@Component({
  selector: "page-downloads",
  templateUrl: "downloads.html"
})
export class DownloadsPage {
  downloadType = "movies";
  hasAnyDownloads = false;
  movieDownloadItems: DownloadItem[] = [];
  episodesDownloadItems: DownloadItem[] = [];

  constructor(
    private downloadService: DownloadService,
    private alertCtrl: AlertController,
    private streamingMedia: StreamingMedia
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DownloadsPage");
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter DownloadsPage");

    this.loadDownloads();
  }

  loadDownloads() {
    this.movieDownloadItems = [];
    this.episodesDownloadItems = [];

    this.hasAnyDownloads =
      this.downloadService.moviesDownloaded.length > 0 ||
      this.downloadService.episodesDownloaded.length > 0;

    this.downloadService.moviesDownloaded.forEach(movie => {
      var downloadItem = new DownloadItem();

      downloadItem.itemId = movie.movieId;
      downloadItem.name = movie.name;
      downloadItem.picture = movie.picture;
      downloadItem.isMovie = true;
      downloadItem.downloadUrl = movie.downloadUrl;

      this.movieDownloadItems.push(downloadItem);
    });

    this.downloadService.episodesDownloaded.forEach(episode => {
      var downloadItem = new DownloadItem();

      downloadItem.itemId = episode.episodeId;
      downloadItem.name = episode.name;
      downloadItem.picture = episode.picture;
      downloadItem.isMovie = false;
      downloadItem.downloadUrl = episode.downloadUrl;

      this.episodesDownloadItems.push(downloadItem);
    });
  }

  goToAvailableDownloads() {
    // this.navCtrl.push("HorizontalListPage", { title: "Available Downloads" });
  }

  playMovie(movieDownloadItem: DownloadItem) {
    if (movieDownloadItem.downloadUrl === "") {
      let alert = this.alertCtrl.create({
        title: "This movie has not yet been uploaded!",
        subTitle:
          "Use the Admin Ion Netflix to add the movie and watch it here!",
        buttons: ["Dismiss"]
      });

      alert.present();
      return;
    }

    let options: StreamingVideoOptions = {
      successCallback: () => {
        console.log("Video played");
      },

      errorCallback: e => {
        console.log("Error streaming");
      },

      orientation: "landscape",
      shouldAutoClose: true,
      controls: true
    };

    this.streamingMedia.playVideo(movieDownloadItem.downloadUrl, options);
  }

  playEpisode(episodeDownloadItem: DownloadItem) {
    if (episodeDownloadItem.downloadUrl === "") {
      let alert = this.alertCtrl.create({
        title: "This episode has not yet been uploaded!",
        subTitle:
          "Use the Admin Ion Netflix to add the episode and watch it here!",
        buttons: ["Dismiss"]
      });

      alert.present();
      return;
    }

    let options: StreamingVideoOptions = {
      successCallback: () => {
        console.log("Video played");
      },

      errorCallback: e => {
        console.log("Error streaming");
      },

      orientation: "landscape",
      shouldAutoClose: true,
      controls: true
    };

    this.streamingMedia.playVideo(episodeDownloadItem.downloadUrl, options);
  }

  deleteMovie(movieDownloadItem: DownloadItem) {
    this.presentMovieDeleteConfirm(movieDownloadItem);
  }

  presentMovieDeleteConfirm(movieDownloadItem: DownloadItem) {
    let alert = this.alertCtrl.create({
      title: "Delete downloaded movie.",
      message: "Do you want to delete this download?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes clicked");

            this.downloadService
              .deleteMovie(movieDownloadItem.itemId)
              .then((result: any) => {
                const index = this.movieDownloadItems.indexOf(
                  movieDownloadItem
                );
                if (index > -1) {
                  this.movieDownloadItems.splice(index, 1);
                }

                this.hasAnyDownloads =
                  this.downloadService.moviesDownloaded.length > 0 ||
                  this.downloadService.episodesDownloaded.length > 0;
              });
          }
        }
      ]
    });

    alert.present();
  }

  deleteEpisode(episodesDownloadItems: DownloadItem) {
    this.presentEpisodeDeleteConfirm(episodesDownloadItems);
  }

  presentEpisodeDeleteConfirm(episodeDownloadItem: DownloadItem) {
    let alert = this.alertCtrl.create({
      title: "Delete downloaded episode.",
      message: "Do you want to delete this download?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes clicked");

            this.downloadService
              .deleteEpisode(episodeDownloadItem.itemId)
              .then((result: any) => {
                const index = this.episodesDownloadItems.indexOf(
                  episodeDownloadItem
                );
                if (index > -1) {
                  this.episodesDownloadItems.splice(index, 1);
                }

                this.hasAnyDownloads =
                  this.downloadService.moviesDownloaded.length > 0 ||
                  this.downloadService.episodesDownloaded.length > 0;
              });
          }
        }
      ]
    });

    alert.present();
  }
}
