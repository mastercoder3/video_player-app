import { Component } from "@angular/core";
import {
  NavController,
  LoadingController,
  Platform,
  AlertController
} from "ionic-angular";
import {
  StreamingMedia,
  StreamingVideoOptions
} from "@ionic-native/streaming-media";
import { HomeScreenService } from "../../services/HomeScreenService";

import { Helper } from "../../data/Helper";
import { HomeScreenGroupItem } from "../../data/HomeScreenGroupItem";
import { HomeScreenGroup } from "../../data/HomeScreenGroup";
import { Movie } from "../../data/Movie";
import { TvShow } from "../../data/TvShow";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  homeScreenGroups: HomeScreenGroup[] = [];

  constructor(
    private navCtrl: NavController,
    private streamingMedia: StreamingMedia,
    private loadingCtrl: LoadingController,
    private homeScreenService: HomeScreenService,
    private platform: Platform,
    private alertController: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");

    this.getHomeScreenGroups();
  }

  getHomeScreenGroups() {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Home..."
    });

    loading.present();

    this.homeScreenService.getHomeScreenGroups().then((result: any) => {
      this.homeScreenGroups = result.homeScreenGroups;

      this.homeScreenGroups.forEach(homeScreenGroup => {
        // Get home screen movies first
        this.homeScreenService
          .getHomeScreenGroupMovies(homeScreenGroup)
          .then((result: any) => {
            result.homeScreenGroupMovies.forEach((movie: Movie) => {
              var movieGroupItem = new HomeScreenGroupItem();

              movieGroupItem.itemId = movie.movieId;
              movieGroupItem.picture = movie.picture;
              movieGroupItem.isMovie = true;

              homeScreenGroup.groupItems.push(movieGroupItem);
            });

            // Then get home screen tv shows
            this.homeScreenService
              .getHomeScreenGroupTvShows(homeScreenGroup)
              .then((result: any) => {
                result.homeScreenGroupTvShows.forEach((tvShow: TvShow) => {
                  var movieGroupItem = new HomeScreenGroupItem();

                  movieGroupItem.itemId = tvShow.tvShowId;
                  movieGroupItem.picture = tvShow.picture;
                  movieGroupItem.isMovie = false;

                  homeScreenGroup.groupItems.push(movieGroupItem);
                });

                // Finally, shuffle them
                homeScreenGroup.groupItems = Helper.shuffle(
                  homeScreenGroup.groupItems
                );
              });
          });
      });

      loading.dismiss();
    });
  }

  goToGroupItemDetails(groupItem: HomeScreenGroupItem) {
    if (groupItem.isMovie) {
      this.navCtrl.push("MovieDetailsPage", { movieId: groupItem.itemId });
    } else {
      this.navCtrl.push("ShowDetailsPage", { tvShowId: groupItem.itemId });
    }
  }

  playVideoTrailer() {
    if (!this.platform.is("cordova")) {
      let alert = this.alertController.create({
        title: "Run on device",
        subTitle: "This feature is only available on a device!",
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

    this.streamingMedia.playVideo(
      "https://firebasestorage.googleapis.com/v0/b/ionnetflix-72e25.appspot.com/o/Watch%20the%20Black%20Lightning%20Trailer.mp4?alt=media&token=3331cd39-f38b-4add-8d83-cec4c213b571",
      options
    );
  }
}
