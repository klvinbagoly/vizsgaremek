import { Image } from "./image";

export class Album {
  id: number = 0;
  name: string = '';
  playcount: number = 0;
  mbid: string = '';
  url: string = '';
  artist: AlbumArtist = new AlbumArtist();
  image: Image[] = [];
}

export class AlbumArtist {
  name: string = '';
  mbid: string = '';
  url: string = '';
}
