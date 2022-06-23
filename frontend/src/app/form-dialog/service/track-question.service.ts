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
      validator: [Validators.required, Validators.pattern(/^[ A-Űa-ű0-9,$\-\.!?+'"&@#()"]{1,100}$/)],
      errorMessage: 'The track title must be between 1 and 100 characters.'
    }

    const url: InputQuestion = {
      value: track?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
      errorMessage: 'The home page of the track must be a valid url.'
    }

    const minutes: InputQuestion = {
      value: Math.floor(track?.duration / 60).toString(),
      key: 'minutes',
      label: 'Duration - minutes',
      type: 'number',
      controlType: 'input'
    }

    const seconds: InputQuestion = {
      value: (track?.duration % 60).toString(),
      key: 'seconds',
      label: 'Duration - seconds',
      type: 'number',
      controlType: 'input',
      validator: [Validators.max(59)],
      errorMessage: 'The seconds value must be less than 60.'
    }

    const artist: InputQuestion = {
      value: track?.artist.name || '',
      key: 'artist',
      label: 'Artist:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.pattern(/^[ A-Űa-ű0-9,$\-\.!?+'"&@#]{1,30}$/)],
      errorMessage: 'The name of the artist must be between 1 and 30 characters.'
    }

    const artistUrl: InputQuestion = {
      value: track?.artist.url || '',
      key: 'artistUrl',
      label: 'Artist url:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
      errorMessage: 'The home page of the artist must be a valid url.'
    }

    const artistMbid: InputQuestion = {
      value: track?.artist.mbid || '',
      key: 'artistMbid',
      label: 'Artist mbid:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.pattern(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/)],
      errorMessage: 'Must be a 36 character hexadecimal number in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }

    return [
      name, url, minutes, seconds, artist, artistUrl, artistMbid
    ]

  }
}
