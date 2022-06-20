import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlbumInfo } from '../model/album-info';
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
}
