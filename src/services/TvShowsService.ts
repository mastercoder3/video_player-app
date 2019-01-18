import { Injectable } from "@angular/core";
import firebase from "firebase";
import { TvShow } from "../data/TvShow";
import { Season } from "../data/Season";
import { Episode } from "../data/Episode";

@Injectable()
export class TvShowsService {
  constructor() {}

  getAllTvShows() {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("tvShows")
        .orderBy("addedAt", "desc")
        .get()
        .then(tvShowsSnapshot => {
          const tvShows = [];

          tvShowsSnapshot.forEach(doc => {
            const tvShow = new TvShow();

            tvShow.tvShowId = doc.id;
            tvShow.name = doc.data().name;
            tvShow.picture = doc.data().picture;
            tvShow.detailsPicture = doc.data().detailsPicture;
            tvShow.releaseYear = doc.data().releaseYear;
            tvShow.rating = doc.data().rating;
            tvShow.description = doc.data().description;

            tvShows.push(tvShow);
          });

          resolve({ tvShows: tvShows });
        });
    });

    return promise;
  }

  getTvShow(tvShowId: string) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("tvShows")
        .doc(tvShowId)
        .get()
        .then(doc => {
          const tvShow = new TvShow();

          tvShow.tvShowId = doc.id;
          tvShow.name = doc.data().name;
          tvShow.picture = doc.data().picture;
          tvShow.detailsPicture = doc.data().detailsPicture;
          tvShow.releaseYear = doc.data().releaseYear;
          tvShow.rating = doc.data().rating;
          tvShow.description = doc.data().description;

          resolve({ tvShow: tvShow });
        });
    });

    return promise;
  }

  getSeasons(tvShow: TvShow) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("tvShows")
        .doc(tvShow.tvShowId)
        .collection("seasons")
        .orderBy("addedAt", "asc")
        .get()
        .then(tvShowSeasonsSnapshot => {
          const tvShowSeasons = [];

          tvShowSeasonsSnapshot.forEach(doc => {
            const season = new Season();

            season.seasonId = doc.id;
            season.name = doc.data().name;
            season.tvShowId = doc.data().tvShowId;
            season.tvShowName = doc.data().tvShowName;

            tvShowSeasons.push(season);
          });

          resolve({ tvShowSeasons: tvShowSeasons });
        })
        .catch(function(error) {
          reject(error);
        });
    });

    return promise;
  }

  getEpisodes(tvShow: TvShow, season: Season) {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("tvShows")
        .doc(tvShow.tvShowId)
        .collection("seasons")
        .doc(season.seasonId)
        .collection("episodes")
        .orderBy("addedAt", "asc")
        .get()
        .then(episodesSnapshot => {
          const seasonEpisodes = [];

          episodesSnapshot.forEach(doc => {
            const episode = new Episode();

            episode.episodeId = doc.id;
            episode.name = doc.data().name;
            episode.description = doc.data().description;
            episode.picture = doc.data().picture;
            episode.seasonId = doc.data().seasonId;
            episode.seasonName = doc.data().seasonName;
            episode.tvShowId = doc.data().tvShowId;
            episode.tvShowName = doc.data().tvShowName;
            episode.videoUrl = doc.data().videoUrl;

            seasonEpisodes.push(episode);
          });

          resolve({ seasonEpisodes: seasonEpisodes });
        });
    });

    return promise;
  }
}
