import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../model/album';
import { TopAlbums } from '../model/top-albums';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseServiceService<TopAlbums> {

  override endString: string = 'albums'
  constructor(
    protected override http: HttpClient
  ) {
    super(http)
  }

  getTopAlbumsByArtist(artist: string): Observable<TopAlbums> {
    return this.http.get<TopAlbums>(`${this.apiUrl}${this.endString}/artist/${artist}`)
  }

  addOneAlbum(id: string, album: Album) {
    return this.http.post(`${this.apiUrl}${this.endString}/${id}`, album)
  }

  updateOneAlbum(id: string, album: Album) {
    return this.http.put(`${this.apiUrl}${this.endString}/${id}/update`, album)
  }
}
