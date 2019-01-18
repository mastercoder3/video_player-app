import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  App,
  LoadingController
} from "ionic-angular";
import { SignInPage } from "../sign-in/sign-in";
import firebase from "firebase";
import { AuthService } from "../../services/AuthService";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  userName: string = "";
  userPicture: string = "";

  constructor(
    private navCtrl: NavController,
    private app: App,
    private loadingCtrl: LoadingController,
    private zone: NgZone,
    private authService: AuthService
  ) {
    this.authService.afAuth.user.subscribe(user => {
      this.userName = user.displayName;
      this.userPicture = user.photoURL;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }

  goToUsers() {
    this.navCtrl.push("UsersPage");
  }

  goToNotifications() {
    this.navCtrl.push("NotificationsPage");
  }

  goToMyList() {
    this.navCtrl.push("MylistPage");
  }

  goToSettings() {
    this.navCtrl.push("SettingsPage");
  }

  signOut() {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Logging out..."
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();

      firebase
        .auth()
        .signOut()
        .then(() => {
          this.zone.run(() => {
            this.app.getRootNav().setRoot(SignInPage);
          });
        });
    }, 500);
  }
}
