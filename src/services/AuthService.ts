import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { Facebook } from "@ionic-native/facebook";
import { Platform, AlertController } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { TwitterConnect } from "@ionic-native/twitter-connect";

@Injectable()
export class AuthService {
  public authState: AngularFireAuth;
  uid: any;

  constructor(
    private alertCtrl: AlertController,
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private twitter: TwitterConnect
  ) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.uid = user.uid;
      } else {
        this.uid = null;
      }
    });
  }

  signInWithFacebookPlugin() {
    if (this.platform.is("cordova")) {
      return this.fb
        .login(["email"])
        .then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
            res.authResponse.accessToken
          );

          firebase
            .auth()
            .signInWithCredential(facebookCredential)
            .then(
              res => {},
              err => {
                console.error("Error: ", err);
                throw err;
              }
            );
        })
        .catch(error => {
          throw error;
        });
    } else {
      return this.signInWithFacebookWeb();
    }
  }

  signInWithFacebookWeb() {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
        res => {},
        err => {
          console.error("Error: ", err);
          throw err;
        }
      );
  }

  signInWithGooglePlugin() {
    if (this.platform.is("cordova")) {
      return this.googlePlus
        .login({
          webClientId:
            "395983984847-84m1jgom088b1d8jdn36v6rspaov5nhp.apps.googleusercontent.com",
          offline: true
        })
        .then(
          res => {
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(
              res.idToken
            );

            firebase
              .auth()
              .signInWithCredential(googleCredential)
              .then(response => {
                console.log("Firebase success: " + JSON.stringify(response));
              });
          },
          err => {
            console.error("Error: ", err);
            throw err;
          }
        );
    } else {
      return this.signInWithGoogleWeb();
    }
  }

  signInWithGoogleWeb() {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        res => {},
        err => {
          console.error("Error: ", err);
          throw err;
        }
      );
  }

  signInWithTwitterPlugin() {
    if (this.platform.is("cordova")) {
      return this.twitter.login().then(
        function(result) {
          console.log("Successful login!");
          console.log(result);
        },
        function(error) {
          console.error("Error logging in");
          console.error(error);
          throw error;
        }
      );
    } else {
      return this.signInWithTwitterWeb();
    }
  }

  signInWithTwitterWeb() {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(
        res => {},
        err => {
          console.error("Error: ", err);
          throw err;
        }
      );
  }

  signInWithGithub() {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(res => {});
  }

  registerUser(email, password, password2) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {})
      .catch(error => {
        throw error;
      });
  }

  signIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {})
      .catch(error => {
        throw error;
      });
  }

  signOut(): void {
    firebase.auth().signOut();
  }

  forgotPassword(email) {
    return firebase
      .app()
      .auth()
      .sendPasswordResetEmail(email)
      .then(s => {
        let alert = this.alertCtrl.create({
          title: "Password Reset",
          subTitle: "Check your inbox to reset your password",
          buttons: ["Dismiss"]
        });
        alert.present();
      })
      .catch(error => {
        throw error;
      });
  }
}
