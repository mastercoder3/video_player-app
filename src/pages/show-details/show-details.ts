import { Component } from "@angular/core";
import {
  IonicPage,
  NavParams,
  ToastController,
  AlertController,
  Platform
} from "ionic-angular";
import {
  StreamingMedia,
  StreamingVideoOptions
} from "@ionic-native/streaming-media";

import { TvShowsService } from "../../services/TvShowsService";
import { AuthService } from "../../services/AuthService";
import { UserService } from "../../services/UserService";
import { DownloadService } from "../../services/DownloadService";

import { TvShow } from "../../data/TvShow";
import { Season } from "../../data/Season";
import { Episode } from "../../data/Episode";

@IonicPage()
@Component({
  selector: "page-show-details",
  templateUrl: "show-details.html"
})
export class ShowDetailsPage {
  userId: string = "";
  tvShowId: string = "";

  title: string;
  detailsPicture: string;
  releaseYear: string;
  rating: string;
  description: string;

  tvShow: TvShow;
  tvShowSeasons: Season[] = [];
  selectedSeason: string;
  seasonEpisodes: Episode[] = [];

  seasonsLoaded = false;
  episodesLoaded = false;
  isPartOfMyList = false;

  constructor(
    private navParams: NavParams,
    private streamingMedia: StreamingMedia,
    private tvShowsService: TvShowsService,
    private userService: UserService,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController,
    private downloadService: DownloadService,
    private platform: Platform
  ) {
    this.authService.afAuth.user.subscribe(user => {
      this.userId = user.uid;
    });

    this.tvShowId = this.navParams.get("tvShowId");

    if (this.tvShowId == undefined) {
      this.tvShowId = "";
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShowDetailsPage");

    this.getTvShow();
    this.getIsPartOfMyList();
  }

  getTvShow() {
    this.tvShowsService.getTvShow(this.tvShowId).then((result: any) => {
      this.tvShow = <TvShow>result.tvShow;

      this.title = this.tvShow.name;
      this.detailsPicture = this.tvShow.detailsPicture;
      this.releaseYear = this.tvShow.releaseYear.toString();
      this.rating = this.tvShow.rating;
      this.description = this.tvShow.description;

      this.tvShowsService.getSeasons(this.tvShow).then((result: any) => {
        this.tvShowSeasons = result.tvShowSeasons;
        this.seasonsLoaded = true;

        if (this.tvShowSeasons.length > 0) {
          this.selectedSeason = this.tvShowSeasons[0].name;

          this.tvShowsService
            .getEpisodes(this.tvShow, this.tvShowSeasons[0])
            .then((result: any) => {
              this.seasonEpisodes = result.seasonEpisodes;

              this.seasonEpisodes.forEach((episode: Episode) => {
                this.downloadService
                  .isEpisodeDownloaded(episode.episodeId)
                  .then((result: any) => {
                    episode.isDownloaded = result.isDownloaded;
                  });
              });

              this.episodesLoaded = true;
            });
        } else {
          this.episodesLoaded = true;
        }
      });
    });
  }

  getIsPartOfMyList() {
    this.userService
      .getIsTvShowPartOfMyList(this.userId, this.tvShowId)
      .then((result: any) => {
        this.isPartOfMyList = result.isPartOfMyList;
      });
  }

  addToMyList() {
    this.userService
      .addTvShowToMyList(this.userId, this.tvShow)
      .then((result: any) => {
        this.isPartOfMyList = true;
        this.showPartOfMyListToast(true);
      });
  }

  removeFromMyList() {
    this.userService
      .removeTvShowFromMyList(this.userId, this.tvShowId)
      .then((result: any) => {
        this.isPartOfMyList = false;
        this.showPartOfMyListToast(false);
      });
  }

  showPartOfMyListToast(added: boolean) {
    let toast = this.toastController.create({
      message: added ? "Added to My List" : "Removed from My List",
      duration: 2000,
      position: "bottom"
    });

    toast.present();
  }

  playEpisode(episode: Episode) {
    if (!this.platform.is("cordova")) {
      let alert = this.alertController.create({
        title: "Run on device",
        subTitle: "This feature is only available on a device!",
        buttons: ["Dismiss"]
      });

      alert.present();
      return;
    }

    if (episode.videoUrl === "") {
      let alert = this.alertController.create({
        title: "This episode has not yet been uploaded!",
        subTitle:
          "Use the Admin Ion Netflix to add your own episode and watch it here!",
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

    this.streamingMedia.playVideo(episode.videoUrl, options);
  }

  seasonChanged(event) {
    this.episodesLoaded = false;

    const season = this.tvShowSeasons.find(x => x.name === event);

    if (season) {
      this.tvShowsService
        .getEpisodes(this.tvShow, season)
        .then((result: any) => {
          this.seasonEpisodes = result.seasonEpisodes;
          this.episodesLoaded = true;
        });
    }
  }

  downloadEpisode(episode: Episode) {
    if (!this.platform.is("cordova")) {
      let alert = this.alertController.create({
        title: "Run on device",
        subTitle: "This feature is only available on a device!",
        buttons: ["Dismiss"]
      });

      alert.present();
      return;
    }

    if (episode.videoUrl === "") {
      let alert = this.alertController.create({
        title: "This episode has not yet been uploaded!",
        subTitle:
          "Use the Admin Ion Netflix to add your own episode and watch it here!",
        buttons: ["Dismiss"]
      });

      alert.present();
      return;
    }

    episode.isDownloading = true;

    this.downloadService.episodeFileTransfer.onProgress(event => {
      var progress = Math.round((event.loaded / event.total) * 100);
      episode.downloadProgress = progress;
    });

    this.downloadService.downloadEpisode(episode).then(
      (result: any) => {
        this.showDownloadToast(episode.name);
        episode.isDownloading = false;
        episode.isDownloaded = true;
      },
      (error: any) => {
        episode.isDownloading = false;
      }
    );
  }

  showDownloadToast(episodeName: string) {
    let toast = this.toastController.create({
      message: 'Episode "' + episodeName + '" successfully downloaded!',
      duration: 2000,
      position: "bottom"
    });

    toast.present();
  }
}
