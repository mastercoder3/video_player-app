import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Movie } from "../data/Movie";
import { TvShow } from "../data/TvShow";

@Injectable()
export class UserService {
  constructor() {}

  addUser(user: firebase.User) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(user.uid)
        .set(
          {
            name: user.displayName,
            picture: user.photoURL
          },
          { merge: true }
        )
        .then(function() {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  getIsMoviePartOfMyList(userId: string, movieId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("moviesFollowed")
        .get()
        .then(moviesFollowedSnapshot => {
          moviesFollowedSnapshot.forEach(doc => {
            if (doc.id === movieId) {
              resolve({ isPartOfMyList: true });
            }
          });

          resolve({ isPartOfMyList: false });
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  addMovieToMyList(userId: string, movie: Movie) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("moviesFollowed")
        .doc(movie.movieId)
        .set(
          {
            movieId: movie.movieId,
            name: movie.name,
            picture: movie.picture
          },
          { merge: true }
        )
        .then(() => {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  removeMovieFromMyList(userId: string, movieId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("moviesFollowed")
        .doc(movieId)
        .delete()
        .then(() => {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  getIsTvShowPartOfMyList(userId: string, tvShowId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("tvShowsFollowed")
        .get()
        .then(tvShowsFollowedSnapshot => {
          tvShowsFollowedSnapshot.forEach(doc => {
            if (doc.id === tvShowId) {
              resolve({ isPartOfMyList: true });
            }
          });

          resolve({ isPartOfMyList: false });
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  addTvShowToMyList(userId: string, tvShow: TvShow) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("tvShowsFollowed")
        .doc(tvShow.tvShowId)
        .set(
          {
            tvShowId: tvShow.tvShowId,
            name: tvShow.name,
            picture: tvShow.picture,
          },
          { merge: true }
        )
        .then(() => {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  removeTvShowFromMyList(userId: string, tvShowId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("tvShowsFollowed")
        .doc(tvShowId)
        .delete()
        .then(() => {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  getFavoriteMovies(userId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("moviesFollowed")
        .get()
        .then(moviesFollowedSnapshot => {
          const favoriteMovies = [];

          moviesFollowedSnapshot.forEach(doc => {
            const movie = new Movie();

            movie.movieId = doc.id;
            movie.name = doc.data().name;
            movie.picture = doc.data().picture;

            favoriteMovies.push(movie);
          });

          resolve({ favoriteMovies: favoriteMovies });
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  getFavoriteTvShows(userId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("users")
        .doc(userId)
        .collection("tvShowsFollowed")
        .get()
        .then(tvShowsFollowedSnapshot => {
          const favoriteTvShows = [];

          tvShowsFollowedSnapshot.forEach(doc => {
            const tvShow = new TvShow();

            tvShow.tvShowId = doc.id;
            tvShow.name = doc.data().name;
            tvShow.picture = doc.data().picture;

            favoriteTvShows.push(tvShow);
          });

          resolve({ favoriteTvShows: favoriteTvShows });
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }
}
