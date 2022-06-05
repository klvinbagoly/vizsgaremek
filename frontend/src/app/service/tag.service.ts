import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagInfo } from '../model/tag-info';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseServiceService<TagInfo> {

  override endString: string = 'tags'
  constructor(
    protected override http: HttpClient
  ) {
    super(http)
  }
}
