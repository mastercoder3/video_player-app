import { Injectable } from "@angular/core";
import firebase from "firebase";
import { ComingSoon } from "../data/ComingSoon";

@Injectable()
export class ComingSoonService {
  constructor() {}

  getComingSoon() {
    const promise = new Promise((resolve, reject) => {
      const db = firebase.firestore();

      db.collection("comingSoon")
        .orderBy("addedAt", "asc")
        .get()
        .then(comingSoonSnapshot => {
          const comingSoonList = [];

          comingSoonSnapshot.forEach(doc => {
            const comingSoon = new ComingSoon();

            comingSoon.comingSoonId = doc.id;
            comingSoon.name = doc.data().name;
            comingSoon.picture = doc.data().picture;
            comingSoon.description = doc.data().description;
            comingSoon.releaseDate = doc.data().releaseDate;

            comingSoonList.push(comingSoon);
          });

          resolve({ comingSoonList: comingSoonList });
        });
    });

    return promise;
  }
}
