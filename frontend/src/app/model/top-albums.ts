import { Album } from "./album";

export class TopAlbums {
  id: number = 0;
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
