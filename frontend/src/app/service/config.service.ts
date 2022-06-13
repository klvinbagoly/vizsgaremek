import { Injectable } from '@angular/core';

export interface INgxTableColumn {
  title: string
  key: string
  type?: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  artistColumns: INgxTableColumn[] = [
    {
      title: 'Name', key: 'name', type: 'inner-link'
    },
    {
      title: 'Playcount', key: 'playcount', type: 'number'
    },
    {
      title: 'Listeners', key: 'listeners', type: 'number'
    },
    {
      title: 'Mbid', key: 'mbid', type: 'mbid'
    },
    {
      title: 'Url', key: 'url', type: 'outer-link'
    },
    {
      title: 'Streamable', key: 'streamable', type: 'boolean'
    },
    {
      title: 'Image', key: 'image', type: 'array'
    },
    {
      title: 'Actions', key: 'a', type: 'actions'
    },
  ]

  albumColumns: INgxTableColumn[] = [
    {
      title: 'Title', key: 'name', type: 'inner-link'
    },
    {
      title: 'Artist', key: 'artist', type: 'object'
    },
    {
      title: 'Playcount', key: 'playcount', type: 'number'
    },
    {
      title: 'Mbid', key: 'mbid', type: 'mbid'
    },
    {
      title: 'Url', key: 'url', type: 'outer-link'
    },
    {
      title: 'Image', key: 'image', type: 'array'
    },
    {
      title: 'Actions', key: '', type: 'actions'
    },
  ]
  constructor() { }
}
