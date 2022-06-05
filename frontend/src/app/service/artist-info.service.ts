import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistInfo } from '../model/artist-info';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistInfoService extends BaseServiceService<ArtistInfo> {

  override endString: string = 'artistInfo'
  constructor(
    protected override http: HttpClient
  ) {
    super(http)
  }
}
