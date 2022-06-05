import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
