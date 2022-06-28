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
      title: 'Artist', key: 'artist', type: 'artist'
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
      title: 'Actions', key: 'a', type: 'actions'
    },
  ]

  artistInfoColumns: INgxTableColumn[] = [
    {
      title: 'Name', key: 'name', type: 'none'
    },
    {
      title: 'Url', key: 'url', type: 'outer-link'
    },
    {
      title: 'Image', key: 'image', type: 'array'
    },
    {
      title: 'Streamable', key: 'streamable', type: 'boolean'
    },
    {
      title: 'On tour', key: 'ontour', type: 'boolean'
    },
    {
      title: 'Tags', key: 'tags', type: 'object'
    },
    {
      title: 'Bio', key: 'bio', type: 'object'
    },
    {
      title: 'Actions', key: 'a', type: 'actions'
    },
  ]
  albumInfoColumns: INgxTableColumn[] = [
    {
      title: 'Title', key: 'name', type: 'none'
    },
    {
      title: 'Artist', key: 'artist', type: 'inner-link'
    },
    {
      title: 'Mbid', key: 'mbid', type: 'mbid'
    },
    {
      title: 'Url', key: 'url', type: 'outer-link'
    },
    {
      title: 'Listeners', key: 'listeners', type: 'number'
    },
    {
      title: 'Playcount', key: 'playcount', type: 'number'
    },
    {
      title: 'Tags', key: 'tags', type: 'object'
    },
    {
      title: 'Actions', key: 'a', type: 'actions'
    },
  ]
  tagInfoColumns: INgxTableColumn[] = [
    {
      title: 'Name', key: 'name', type: 'none'
    },
    {
      title: 'Total', key: 'total', type: 'number'
    },
    {
      title: 'Reach', key: 'reach', type: 'number'
    },
    {
      title: 'Wiki', key: 'wiki', type: 'object'
    },
    {
      title: 'Actions', key: 'a', type: 'actions'
    },
  ]
  constructor() { }
}
