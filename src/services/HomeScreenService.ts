import { Injectable } from "@angular/core";
import firebase from "firebase";

import { HomeScreenGroup } from "../data/HomeScreenGroup";
import { Movie } from "../data/Movie";
import { TvShow } from "../data/TvShow";

@Injectable()
export class HomeScreenService {
  constructor() {}

  getHomeScreenGroups() {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("homeScreenGroups")
        .get()
        .then(homeScreenGroupsSnapshot => {
          const homeScreenGroups = [];

          homeScreenGroupsSnapshot.forEach(doc => {
            const group = new HomeScreenGroup();

            group.groupId = doc.id;
            group.name = doc.data().name;

            homeScreenGroups.push(group);
          });

          resolve({ homeScreenGroups: homeScreenGroups });
        });
    });

    return promise;
  }

  getHomeScreenGroupMovies(homeScreenGroup: HomeScreenGroup): any {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("homeScreenGroups")
        .doc(homeScreenGroup.groupId)
        .collection("movies")
        .get()
        .then(homeScreenGroupsMoviesSnapshot => {
          const homeScreenGroupMovies = [];

          homeScreenGroupsMoviesSnapshot.forEach(doc => {
            const movie = new Movie();

            movie.homeScreenGroupMovieId = doc.id;
            movie.movieId = doc.data().movieId;
            movie.name = doc.data().name;
            movie.picture = doc.data().picture;
            movie.releaseYear = doc.data().releaseYear;
            movie.rating = doc.data().rating;
            movie.description = doc.data().description;
            movie.videoUrl = doc.data().videoUrl;

            homeScreenGroupMovies.push(movie);
          });

          resolve({ homeScreenGroupMovies: homeScreenGroupMovies });
        });
    });

    return promise;
  }

  getHomeScreenGroupTvShows(homeScreenGroup: HomeScreenGroup): any {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("homeScreenGroups")
        .doc(homeScreenGroup.groupId)
        .collection("tvShows")
        .get()
        .then(homeScreenGroupTvShowsSnapshot => {
          const homeScreenGroupTvShows = [];

          homeScreenGroupTvShowsSnapshot.forEach(doc => {
            const tvShow = new TvShow();

            tvShow.homeScreenGroupTvShowId = doc.id;
            tvShow.tvShowId = doc.data().tvShowId;
            tvShow.name = doc.data().name;
            tvShow.picture = doc.data().picture;
            tvShow.releaseYear = doc.data().releaseYear;
            tvShow.rating = doc.data().rating;
            tvShow.description = doc.data().description;

            homeScreenGroupTvShows.push(tvShow);
          });

          resolve({ homeScreenGroupTvShows: homeScreenGroupTvShows });
        });
    });

    return promise;
  }
}
