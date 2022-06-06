import { Image } from "./image";

export class Album {
  [key: string]: any;
  id: number = 0;
  name: string = '';
  playcount: number = 0;
  mbid: string = '';
  url: string = '';
  artist: AlbumArtist = new AlbumArtist();
  image: Image[] = [];

  constructor(options: { [key: string]: any }) {
    for (let key in options) {
      this[key] = options[key]
    }
  }
}

export class AlbumArtist {
  name: string = '';
  mbid: string = '';
  url: string = '';
}
