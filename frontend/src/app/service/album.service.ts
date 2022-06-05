import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../model/album';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseServiceService<Album> {

  override endString: string = 'album'
  constructor(
    protected override http: HttpClient
  ) {
    super(http)
  }
}
