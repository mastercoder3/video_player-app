import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { AuthService } from "../../services/AuthService";

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  signUpSegment: string = "cancel";
  registerData: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.registerData = { email: "", password: "", password2: "" };
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignUpPage");
  }

  signIn() {
    this.navCtrl.push("SignInPage");
  }

  signUp(): void {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Singing up..."
    });

    loading.present();

    this.authService
      .registerUser(
        this.registerData.email,
        this.registerData.password,
        this.registerData.password2
      )
      .then(x => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: "Sign Up Error",
          subTitle: error.message,
          buttons: ["Dismiss"]
        });

        alert.present();
      });
  }
}
