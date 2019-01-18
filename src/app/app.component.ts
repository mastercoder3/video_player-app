import { Component, NgZone } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SignInPage } from "../pages/sign-in/sign-in";

import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { DownloadService } from "../services/DownloadService";

import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = SignInPage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authService: AuthService,
    private userService: UserService,
    private downloadService: DownloadService,
    private zone: NgZone
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.downloadService.load();

    this.authService.afAuth.authState.subscribe((user: firebase.User) => {
      console.log(user);

      if (user) {
        this.userService.addUser(user);

        this.zone.run(() => {
          this.rootPage = TabsPage;
        });
      }
    }, error => {
      console.error(JSON.stringify(error));
    });
  }
}
