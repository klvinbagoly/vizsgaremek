import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from '../model/artist';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BaseServiceService<Artist> {

  override endString: string = 'artist'
  constructor(
    protected override http: HttpClient
  ) {
    super(http)
  }
}
