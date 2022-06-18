import { AlbumTrack } from "./album-track";
import { Tag } from "./artist-tag";
import { Image } from "./image";
import { Wiki } from "./tag-info";

export class AlbumInfo {
  [key: string]: any;
  _id?: string = '';
  artist: string = '';
  mbid: string = '';
  tags: AlbumTags = new AlbumTags();
  name: string = '';
  image: Image[] = [];
  listeners: string = '';
  playcount: string = '';
  url: string = '';
  tracks: Tracks = new Tracks();
  wiki?: Wiki = new Wiki();

  constructor(options: { [key: string]: any } = {}) {
    for (let key in options) {
      this[key] = options[key]
    }
  }
}

export class AlbumTags {
  tag: Tag[] = [];
}

export class Tracks {
  track: AlbumTrack[] = [];
}
