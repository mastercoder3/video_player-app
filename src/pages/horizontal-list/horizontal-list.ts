import { Component } from "@angular/core";
import { IonicPage, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-horizontal-list",
  templateUrl: "horizontal-list.html"
})
export class HorizontalListPage {
  title: string;
  popularMovies: any[] = [];
  trendingMovies: any[] = [];
  myMovies: any[] = [];

  constructor(private navParams: NavParams) {
    this.title = this.navParams.get("title");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HorizontalListPage");
  }
}
