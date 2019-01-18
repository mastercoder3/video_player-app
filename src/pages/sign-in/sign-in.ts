import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ViewController,
  LoadingController,
  AlertController
} from "ionic-angular";
import { AuthService } from "../../services/AuthService";

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  loginData: any;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.loginData = { email: "", password: "" };
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignInPage");
  }

  signIn() {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Logging in..."
    });

    loading.present();

    this.authService
      .signIn(this.loginData.email, this.loginData.password)
      .then(x => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        console.log(error);

        let alert = this.alertCtrl.create({
          title: "Log In Error",
          subTitle: error.message,
          buttons: ["Dismiss"]
        });

        alert.present();
      });
  }

  signInWithFacebook() {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Logging in with Facebook..."
    });

    loading.present();

    this.authService
      .signInWithFacebookPlugin()
      .then(() => {
        loading.dismiss();
      })
      .catch(error => {
        // Known Ionic View restriction
        if (error == "plugin_not_installed") {
          this.showIonicViewErrorMessage().then(() => {
            this.authService
              .signInWithFacebookWeb()
              .then(() => {
                loading.dismiss();
              })
              .catch(error => {
                loading.dismiss();
                this.handleFacebookLoginError(error);
              });
          });
        } else {
          loading.dismiss();
          this.handleFacebookLoginError(error);
        }
      });
  }

  signInWithGoogle(): void {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Logging in with Google..."
    });

    loading.present();

    this.authService
      .signInWithGooglePlugin()
      .then(() => {
        loading.dismiss();
      })
      .catch(error => {
        // Known Ionic View restriction
        if (error == "plugin_not_installed") {
          this.showIonicViewErrorMessage().then(() => {
            this.authService
              .signInWithGoogleWeb()
              .then(() => {
                loading.dismiss();
              })
              .catch(error => {
                loading.dismiss();
                this.handleGoogleLoginError(error.message);
              });
          });
        } else {
          loading.dismiss();
          this.handleGoogleLoginError(error.message);
        }
      });
  }

  signInWithTwitter(): void {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Logging in with Twitter..."
    });

    loading.present();

    this.authService
      .signInWithTwitterPlugin()
      .then(() => {
        loading.dismiss();
      })
      .catch(error => {
        // Known Ionic View restriction
        if (error == "plugin_not_installed") {
          this.showIonicViewErrorMessage().then(() => {
            this.authService
              .signInWithTwitterWeb()
              .then(() => {
                loading.dismiss();
              })
              .catch(error => {
                loading.dismiss();
                this.handleTwitterLoginError(error.message);
              });
          });
        } else {
          loading.dismiss();
          this.handleTwitterLoginError(error.message);
        }
      });
  }

  showIonicViewErrorMessage() {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: "Ionic View Login Error",
        subTitle:
          "Ionic View does not currently support this login plugin. Logging in using web...",
        buttons: [
          {
            text: "OK",
            handler: () => {
              alert.dismiss().then(() => {
                resolve();
              });
            }
          }
        ]
      });

      alert.present();
    });
  }

  handleFacebookLoginError(error) {
    let alert = this.alertCtrl.create({
      title: "Facebook Login Error",
      subTitle: error,
      buttons: ["Dismiss"]
    });

    alert.present();
  }

  handleGoogleLoginError(error) {
    let alert = this.alertCtrl.create({
      title: "Google Login Error",
      subTitle: error,
      buttons: ["Dismiss"]
    });

    alert.present();
  }

  handleTwitterLoginError(error) {
    let alert = this.alertCtrl.create({
      title: "Twitter Login Error",
      subTitle: error,
      buttons: ["Dismiss"]
    });

    alert.present();
  }

  goToSignUp() {
    if (this.navCtrl.canGoBack()) {
      this.viewCtrl.dismiss();
    } else {
      this.navCtrl.push("SignUpPage");
    }
  }
}
