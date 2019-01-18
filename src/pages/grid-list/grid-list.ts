import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CategoriesService } from "../../services/CategoriesService";
import { Category } from "../../data/Category";
import { Movie } from "../../data/Movie";
import { CategoryItem } from "../../data/CategoryItem";
import { TvShow } from "../../data/TvShow";
import { Helper } from "../../data/Helper";

@IonicPage()
@Component({
  selector: "page-grid-list",
  templateUrl: "grid-list.html"
})
export class GridListPage {
  title: string;
  loaded = false;
  category: Category;
  categoryItems: CategoryItem[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private categoriesService: CategoriesService
  ) {
    this.category = this.navParams.get("category");

    if (this.category) {
      this.title = this.category.name;
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad GridListPage");

    this.getCategoryMoviesAndShows();
  }

  getCategoryMoviesAndShows(): any {
    // Get movies first
    this.categoriesService
      .getCategoryMovies(this.category)
      .then((result: any) => {
        result.categoryMovies.forEach((movie: Movie) => {
          var categoryItem = new CategoryItem();

          categoryItem.itemId = movie.movieId;
          categoryItem.name = movie.name;
          categoryItem.picture = movie.picture;
          categoryItem.isMovie = true;

          this.categoryItems.push(categoryItem);
        });

        // Then get tv shows
        this.categoriesService
          .getCategoryTvShows(this.category)
          .then((result: any) => {
            result.categoryTvShows.forEach((tvShow: TvShow) => {
              var categoryItem = new CategoryItem();

              categoryItem.itemId = tvShow.tvShowId;
              categoryItem.name = tvShow.name;
              categoryItem.picture = tvShow.picture;
              categoryItem.isMovie = false;

              this.categoryItems.push(categoryItem);
            });

            // Finally, shuffle them
            this.categoryItems = Helper.shuffle(this.categoryItems);
            this.loaded = true;
          });
      });
  }

  goToCategoryItem(categoryItem: CategoryItem) {
    if (categoryItem.isMovie) {
      this.navCtrl.push("MovieDetailsPage", { movieId: categoryItem.itemId });
    } else {
      this.navCtrl.push("ShowDetailsPage", { tvShowId: categoryItem.itemId });
    }
  }
}
