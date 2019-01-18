import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-users",
  templateUrl: "users.html"
})
export class UsersPage {
  showEditIcon: boolean = false;

  constructor() {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UsersPage");
  }

  editProfiles() {
    this.showEditIcon = true;
  }

  cancelEdit() {
    this.showEditIcon = false;
  }
}
