import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { NotificationItem } from "../../data/NotificationItem";

@IonicPage()
@Component({
  selector: "page-notifications",
  templateUrl: "notifications.html"
})
export class NotificationsPage {
  notifications: NotificationItem[] = [];

  constructor() {
    this.initialiseNotifications();
  }

  initialiseNotifications() {
    this.notifications.push(
      new NotificationItem(
        "Play the trailer",
        "Coming March 5",
        "assets/imgs/american dream.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "The Hurt Locker",
        "Now on Netflix for you",
        "assets/imgs/hurt-locker.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "John Wick: Chapter 2",
        "New arrival",
        "assets/imgs/notifications-image1.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Left Behind",
        "New arrival",
        "assets/imgs/left-behind.png",
        true
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Vampire Academy",
        "New arrival",
        "assets/imgs/vampire-academy.png",
        true
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Standup for Dummies",
        "New arrival",
        "assets/imgs/standup-for-dummies.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Damnation",
        "New arrival",
        "assets/imgs/damnation-notification.png",
        true
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Almost Banned",
        "New arrival",
        "assets/imgs/almost-banned.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Hay gente asi",
        "New arrival",
        "assets/imgs/hay-dente-asi.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Riase el Show",
        "New arrival",
        "assets/imgs/riase-el-show.png",
        true
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Great America",
        "New arrival",
        "assets/imgs/great-america.png",
        true
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Especial de Standup",
        "New arrival",
        "assets/imgs/especial-de-standup.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Weeds",
        "New arrival",
        "assets/imgs/weeds.png",
        false
      )
    );
    this.notifications.push(
      new NotificationItem(
        "Equanimity",
        "New arrival",
        "assets/imgs/equanimity.png",
        true
      )
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotificationsPage");
  }
}
