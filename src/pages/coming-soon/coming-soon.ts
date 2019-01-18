import { Component } from "@angular/core";
import { IonicPage, LoadingController } from "ionic-angular";
import { ComingSoonService } from "../../services/ComingSoonService";
import { ComingSoon } from "../../data/ComingSoon";

@IonicPage()
@Component({
  selector: "page-coming-soon",
  templateUrl: "coming-soon.html"
})
export class ComingSoonPage {
  private loaded = false;
  private comingSoonList: ComingSoon[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private comingSoonService: ComingSoonService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ComingSoonPage");

    this.getComingSoon();
  }

  getComingSoon(): void {
    var loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading Coming Soon..."
    });

    loading.present();

    this.comingSoonService.getComingSoon().then((result: any) => {
      this.comingSoonList = result.comingSoonList;
      this.loaded = true;
      loading.dismiss();
    });
  }
}
