import { Image } from "./image";

export class Artist {
  id: number = 0;
  name: string = '';
  playcount: string = '';
  listeners: string = '';
  mbid: string = '';
  url: string = '';
  streamable: string = '';
  image: Image[] = [];
}
