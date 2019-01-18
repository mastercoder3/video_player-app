import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Movie } from "../data/Movie";

@Injectable()
export class MoviesService {
  constructor() {}

  getMovie(movieId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("movies")
        .doc(movieId)
        .get()
        .then(doc => {
          const movie = new Movie();

          movie.movieId = doc.id;
          movie.name = doc.data().name;
          movie.picture = doc.data().picture;
          movie.detailsPicture = doc.data().detailsPicture;
          movie.releaseYear = doc.data().releaseYear;
          movie.rating = doc.data().rating;
          movie.description = doc.data().description;
          movie.videoUrl = doc.data().videoUrl;

          resolve({ movie: movie });
        });
    });

    return promise;
  }

  getAllMovies() {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("movies")
        .orderBy("addedAt", "desc")
        .get()
        .then(moviesSnapshot => {
          const movies = [];

          moviesSnapshot.forEach(doc => {
            const movie = new Movie();

            movie.movieId = doc.id;
            movie.name = doc.data().name;
            movie.picture = doc.data().picture;
            movie.detailsPicture = doc.data().detailsPicture;
            movie.releaseYear = doc.data().releaseYear;
            movie.rating = doc.data().rating;
            movie.description = doc.data().description;
            movie.videoUrl = doc.data().videoUrl;

            movies.push(movie);
          });

          resolve({ movies: movies });
        });
    });

    return promise;
  }

  getRecentlyAddedMovies() {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("movies")
        .limit(12)
        .orderBy("addedAt", "desc")
        .get()
        .then(moviesSnapshot => {
          const movies = [];

          moviesSnapshot.forEach(doc => {
            const movie = new Movie();

            movie.movieId = doc.id;
            movie.name = doc.data().name;
            movie.picture = doc.data().picture;
            movie.detailsPicture = doc.data().detailsPicture;
            movie.releaseYear = doc.data().releaseYear;
            movie.rating = doc.data().rating;
            movie.description = doc.data().description;
            movie.videoUrl = doc.data().videoUrl;

            movies.push(movie);
          });

          resolve({ movies: movies });
        });
    });

    return promise;
  }
}
