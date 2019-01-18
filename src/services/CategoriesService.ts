import firebase from "firebase";
import { TvShow } from "../data/TvShow";
import { Movie } from "../data/Movie";
import { Category } from "../data/Category";
export class CategoriesService {
  constructor() {}

  getCategories() {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("categories")
        .get()
        .then(categoriesSnapshot => {
          const categories = [];

          categoriesSnapshot.forEach(doc => {
            const category = new Category(doc.data().name);
            category.categoryId = doc.id;

            categories.push(category);
          });

          resolve({ categories: categories });
        });
    });

    return promise;
  }

  getCategoryMovies(category: Category) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("categories")
        .doc(category.categoryId)
        .collection("movies")
        .get()
        .then(categoryMoviesSnapshot => {
          const categoryMovies = [];

          categoryMoviesSnapshot.forEach(doc => {
            const movie = new Movie();

            movie.categoryMovieId = doc.id;
            movie.movieId = doc.data().movieId;
            movie.name = doc.data().name;
            movie.picture = doc.data().picture;
            movie.releaseYear = doc.data().releaseYear;
            movie.rating = doc.data().rating;
            movie.description = doc.data().description;
            movie.videoUrl = doc.data().videoUrl;

            categoryMovies.push(movie);
          });

          resolve({ categoryMovies: categoryMovies });
        });
    });

    return promise;
  }

  getCategoryTvShows(category: Category) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("categories")
        .doc(category.categoryId)
        .collection("tvShows")
        .get()
        .then(categoryTvShowsSnapshot => {
          const categoryTvShows = [];

          categoryTvShowsSnapshot.forEach(doc => {
            const tvShow = new TvShow();

            tvShow.categoryTvShowId = doc.id;
            tvShow.tvShowId = doc.data().tvShowId;
            tvShow.name = doc.data().name;
            tvShow.picture = doc.data().picture;
            tvShow.releaseYear = doc.data().releaseYear;
            tvShow.rating = doc.data().rating;
            tvShow.description = doc.data().description;

            categoryTvShows.push(tvShow);
          });

          resolve({ categoryTvShows: categoryTvShows });
        });
    });

    return promise;
  }
}
