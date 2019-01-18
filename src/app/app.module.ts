import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ComingSoonPage } from '../pages/coming-soon/coming-soon';
import { DownloadsPage } from '../pages/downloads/downloads';
import { ProfilePage } from '../pages/profile/profile';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';

import { SignInPageModule } from '../pages/sign-in/sign-in.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from "@ionic-native/file";
import { IonicStorageModule } from '@ionic/storage';

import * as firebase from "firebase";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AuthService } from '../services/AuthService';
import { ComingSoonService } from '../services/ComingSoonService';
import { HomeScreenService } from '../services/HomeScreenService';
import { MoviesService } from '../services/MoviesService';
import { TvShowsService } from '../services/TvShowsService';
import { CategoriesService } from '../services/CategoriesService';
import { UserService } from '../services/UserService';
import { DownloadService } from '../services/DownloadService';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiOvEaEoLaDBy1MssvWiz2IgU2WErI6So",
  authDomain: "qiinii.firebaseapp.com",
  databaseURL: "https://qiinii.firebaseio.com",
  projectId: "qiinii",
  storageBucket: "qiinii.appspot.com",
  messagingSenderId: "637064429236"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    ComingSoonPage,
    DownloadsPage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    SignInPageModule,
    SignUpPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    ComingSoonPage,
    DownloadsPage,
    ProfilePage,
    TabsPage,
    SignUpPage,
    SignInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    AuthService,
    ComingSoonService,
    HomeScreenService,
    MoviesService,
    TvShowsService,
    CategoriesService,
    UserService,
    DownloadService,
    Facebook,
    GooglePlus,
    TwitterConnect,
    FileTransfer, 
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
