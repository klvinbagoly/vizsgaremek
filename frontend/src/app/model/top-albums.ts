import { Album } from "./album";

export class TopAlbums {
  _id?: string = '';
  album: Album[] = [];
  '@attr': Attr = new Attr()
}

export class Attr {
  artist: string = '';
  page: string = '';
  perPage: string = '';
  totalPages: string = '';
  total: string = '';
}
