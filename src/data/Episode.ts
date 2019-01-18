export class Episode {
  constructor() {}

  episodeId: string;
  name: string;
  description: string;
  picture: string;
  seasonId: string;
  seasonName: string;
  tvShowId: string;
  tvShowName: string;
  videoUrl: string;
  isDownloading: boolean;
  isDownloaded: boolean;
  downloadProgress: number;
}
