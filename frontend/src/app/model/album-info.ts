import { Tag } from "./artist-tag";
import { Image } from "./image";

export class AlbumInfo {
  id: number = 0;
  artist: string = '';
  mbid: string = '';
  tags: AlbumTags = new AlbumTags();
  name: string = '';
  image: Image[] = [];
  listeners: string = '';
  playcount: string = '';
  url: string = '';
}

export class AlbumTags {
  tag: Tag[] = [];
}
