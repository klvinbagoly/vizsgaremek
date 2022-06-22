import { AlbumArtist } from "./album";

export class AlbumTrack {
  _id?: string = ''
  streamable: Streamable = new Streamable();
  duration: number = 0;
  url: string = '';
  name: string = '';
  '@attr': Attr = new Attr();
  artist: AlbumArtist = new AlbumArtist();
}

export class Streamable {
  fulltrack: string = '';
  #text: string = '';
}

export class Attr {
  rank: number = 0;
}
