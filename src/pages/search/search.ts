import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

import { CategoriesService } from "../../services/CategoriesService";
import { MoviesService } from "../../services/MoviesService";
import { TvShowsService } from "../../services/TvShowsService";

import { SearchItem } from "../../data/SearchItem";
import { Category } from "../../data/Category";
import { Movie } from "../../data/Movie";
import { TvShow } from "../../data/TvShow";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  categories: Category[] = [];
  loaded = false;

  isSearching = false;
  searchDone = false;
  searchValue: string = "";
  searchItems: SearchItem[] = [];

  constructor(
    private navCtrl: NavController,
    private categoriesService: CategoriesService,
    private moviesService: MoviesService,
    private tvShowsService: TvShowsService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");

    this.listenForSearchInput(500);
    this.getCategories();
  }

  listenForSearchInput(timeoutTime: number): any {
    const searchInput = <HTMLInputElement>(
      document.getElementById("searchInput")
    );

    let timeout = null;

    searchInput.onkeyup = e => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        this.search(this.searchValue);
      }, timeoutTime);
    };
  }

  search(searchValue: string) {
    this.isSearching = true;

    if (searchValue !== "" && searchValue.length >= 3) {
      this.searchItems = [];

      // Search movies first
      this.moviesService.getAllMovies().then((result: any) => {
        (<Movie[]>result.movies).forEach(movie => {
          if (
            movie.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
          ) {
            var searchItem = new SearchItem();

            searchItem.itemId = movie.movieId;
            searchItem.name = movie.name;
            searchItem.picture = movie.picture;
            searchItem.isMovie = true;

            this.searchItems.push(searchItem);
          }
        });

        // Then search tv shows
        this.tvShowsService.getAllTvShows().then((result: any) => {
          (<TvShow[]>result.tvShows).forEach(tvShow => {
            if (
              tvShow.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
            ) {
              var searchItem = new SearchItem();

              searchItem.itemId = tvShow.tvShowId;
              searchItem.name = tvShow.name;
              searchItem.picture = tvShow.picture;
              searchItem.isMovie = false;

              this.searchItems.push(searchItem);
            }
          });

          this.searchDone = true;
        });
      });
    } else if (searchValue === "") {
      this.clearSearch();
    }
  }

  onClear(event) {
    this.clearSearch();
  }

  clearSearch() {
    this.isSearching = false;
    this.searchDone = false;
    this.searchItems = [];
  }

  goToSearchItem(searchItem: SearchItem) {
    if (searchItem.isMovie) {
      this.navCtrl.push("MovieDetailsPage", { movieId: searchItem.itemId });
    } else {
      this.navCtrl.push("ShowDetailsPage", { tvShowId: searchItem.itemId });
    }
  }

  getCategories() {
    this.categoriesService.getCategories().then((result: any) => {
      this.categories = result.categories;
      this.loaded = true;
    });
  }

  openCategory(category: Category) {
    this.navCtrl.push("GridListPage", { category: category });
  }
}
