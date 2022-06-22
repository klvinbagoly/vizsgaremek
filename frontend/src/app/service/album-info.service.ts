import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlbumInfo } from '../model/album-info';
import { AlbumTrack } from '../model/album-track';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumInfoService extends BaseServiceService<AlbumInfo> {

  override endString: string = 'albumInfo'
  constructor(
    protected override http: HttpClient
  ) {
    super(http)
  }

  saveEvent: BehaviorSubject<null> = new BehaviorSubject<null>(null)

  addTrack(id: string, track: AlbumTrack) {
    return this.http.patch<AlbumInfo>(`${this.apiUrl}${this.endString}/add-track/${id}`, track)
  }

  updateTrack(id: string, track: AlbumTrack) {
    return this.http.patch<AlbumInfo>(`${this.apiUrl}${this.endString}/update-track/${id}`, track)
  }
}
