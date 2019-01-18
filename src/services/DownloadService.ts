import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import {
  FileTransfer,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { Movie } from "../data/Movie";
import { Episode } from "../data/Episode";

@Injectable()
export class DownloadService {
  moviesDownloaded: any[] = [];
  episodesDownloaded: any[] = [];

  storageDirectory: string = "";
  movieFileTransfer: FileTransferObject = this.transfer.create();
  episodeFileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is("cordova")) {
        return false;
      }

      if (this.platform.is("ios")) {
        this.storageDirectory = file.documentsDirectory;
      } else if (this.platform.is("android")) {
        this.storageDirectory = file.externalRootDirectory + "ionNetflix/";
      } else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  load() {
    // this.storage.clear();
    
    // get all movies and tv shows episodes already stored on device
    this.storage.get("movies").then(val => {
      if (val !== null) {
        this.moviesDownloaded = val;
      }
    });

    this.storage.get("episodes").then(val => {
      if (val !== null) {
        this.episodesDownloaded = val;
        console.log(JSON.stringify(this.episodesDownloaded));
      }
    });
  }

  downloadMovie(movie: Movie) {
    const promise = new Promise((resolve, reject) => {
      this.movieFileTransfer
        .download(movie.videoUrl, this.file.dataDirectory + movie.name + ".mp4")
        .then(
          entry => {
            console.log("download complete: " + JSON.stringify(entry.toURL()));

            this.moviesDownloaded.push({
              movieId: movie.movieId,
              name: movie.name,
              picture: movie.picture,
              detailsPicture: movie.detailsPicture,
              downloadUrl: entry.toURL()
            });

            this.storage.set("movies", this.moviesDownloaded);

            resolve({ downloadUrl: entry.toURL() });
          },
          error => {
            console.error(JSON.stringify(error));
            reject(error);
          }
        );
    });

    return promise;
  }

  downloadEpisode(episode: Episode) {
    const promise = new Promise((resolve, reject) => {
      this.episodeFileTransfer
        .download(
          episode.videoUrl,
          this.file.dataDirectory + episode.name + ".mp4"
        )
        .then(
          entry => {
            console.log("download complete: " + JSON.stringify(entry.toURL()));

            this.episodesDownloaded.push({
              episodeId: episode.episodeId,
              name: episode.name,
              picture: episode.picture,
              downloadUrl: entry.toURL()
            });

            this.storage.set("episodes", this.episodesDownloaded);

            resolve({ downloadUrl: entry.toURL() });
          },
          error => {
            console.error(JSON.stringify(error));
            reject(error);
          }
        );
    });

    return promise;
  }

  isMovieDownloaded(movieId: string) {
    const promise = new Promise((resolve, reject) => {
      if (this.moviesDownloaded.length > 0) {
        var isDownloaded = false;

        for (var i = 0; i < this.moviesDownloaded.length; i++) {
          var movie = this.moviesDownloaded[i];

          if (movie.movieId == movieId) {
            isDownloaded = true;
            break;
          }
        }

        resolve({ isDownloaded: isDownloaded });
      } else {
        resolve({ isDownloaded: false });
      }
    });

    return promise;
  }

  isEpisodeDownloaded(episodeId: string) {
    const promise = new Promise((resolve, reject) => {
      if (this.episodesDownloaded.length > 0) {
        var isDownloaded = false;

        for (var i = 0; i < this.episodesDownloaded.length; i++) {
          var episode = this.episodesDownloaded[i];

          if (episode.episodeId == episodeId) {
            isDownloaded = true;
            break;
          }
        }

        resolve({ isDownloaded: isDownloaded });
      } else {
        resolve({ isDownloaded: false });
      }
    });

    return promise;
  }

  deleteMovie(movieId: string) {
    const promise = new Promise((resolve, reject) => {
      var deleteIndex = -1;

      for (var i = 0; i < this.moviesDownloaded.length; i++) {
        var movie = this.moviesDownloaded[i];

        if (movie.movieId == movieId) {
          deleteIndex = i;
          break;
        }
      }

      if (deleteIndex > -1) {
        this.moviesDownloaded.splice(deleteIndex, 1);
      }

      this.storage.set("movies", this.moviesDownloaded);

      resolve();
    });

    return promise;
  }

  deleteEpisode(episodeId: string) {
    const promise = new Promise((resolve, reject) => {
      var deleteIndex = -1;

      for (var i = 0; i < this.episodesDownloaded.length; i++) {
        var movie = this.episodesDownloaded[i];

        if (movie.episodeId == episodeId) {
          deleteIndex = i;
          break;
        }
      }

      if (deleteIndex > -1) {
        this.episodesDownloaded.splice(deleteIndex, 1);
      }

      this.storage.set("episodes", this.episodesDownloaded);

      resolve();
    });

    return promise;
  }
}
