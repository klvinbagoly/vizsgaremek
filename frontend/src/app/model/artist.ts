import { Image } from "./image";

export class Artist {
  [key: string]: any;
  _id?: string = '';
  name: string = '';
  playcount: string = '';
  listeners: string = '';
  mbid: string = '';
  url: string = '';
  streamable: string = '';
  image: Image[] = [];

  constructor(options: { [key: string]: any } = {}) {
    for (let key in options) {
      this[key] = options[key]
    }
  }
}
