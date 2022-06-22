import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { AlbumTrack } from 'src/app/model/album-track';
import { InputQuestion } from '../model/input-question';

@Injectable({
  providedIn: 'root'
})
export class TrackQuestionService {

  constructor() { }

  getQuestions(track: AlbumTrack = new AlbumTrack()) {
    const name: InputQuestion = {
      value: track?.name || '',
      key: 'name',
      label: 'Track name:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.required]
    }

    const url: InputQuestion = {
      value: track?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input'
    }

    const minutes: InputQuestion = {
      value: Math.floor(track?.duration / 60).toString(),
      key: 'minutes',
      label: 'minutes',
      type: 'number',
      controlType: 'input'
    }

    const seconds: InputQuestion = {
      value: (track?.duration % 60).toString(),
      key: 'seconds',
      label: 'seconds',
      type: 'number',
      controlType: 'input'
    }

    const artist: InputQuestion = {
      value: track?.artist.name || '',
      key: 'artist',
      label: 'Artist:',
      type: 'text',
      controlType: 'input'
    }

    const artistUrl: InputQuestion = {
      value: track?.artist.url || '',
      key: 'artistUrl',
      label: 'Artist url:',
      type: 'text',
      controlType: 'input'
    }

    const artistMbid: InputQuestion = {
      value: track?.artist.mbid || '',
      key: 'artistMbid',
      label: 'Artist mbid:',
      type: 'text',
      controlType: 'input'
    }

    return [
      name, url, minutes, seconds, artist, artistUrl, artistMbid
    ]

  }
}
