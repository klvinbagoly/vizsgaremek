import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Album } from 'src/app/model/album';
import { InputQuestion } from '../model/input-question';
import { Question } from '../model/question';
import { ArtistQuestionService } from './artist-question.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumQuestionService {

  constructor(
    private artistQuestionService: ArtistQuestionService
  ) { }

  getQuestions(album: Album = new Album()) {
    const name: InputQuestion = {
      value: album?.name || '',
      key: 'name',
      label: 'Album title:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.required, Validators.pattern(/^[ A-Űa-ű0-9,$\-\.!?+'"&@#()"]{1,100}$/)],
      errorMessage: 'The album title must be between 1 and 100 characters.'
    }

    const url: InputQuestion = {
      value: album?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
      errorMessage: 'The home page of the album must be a valid url.'
    }

    const images = album?.image || [{ url: '', size: '' }]
    const imageGroup: Array<Array<Question<any>>> = this.artistQuestionService.createImageGroup(images)

    const playcount: InputQuestion = {
      controlType: 'input',
      type: 'number',
      value: album?.playcount.toString() || '',
      key: 'playcount',
      label: 'Playcount'
    }

    const mbid: InputQuestion = {
      controlType: 'input',
      type: 'text',
      value: album?.mbid || '',
      key: 'mbid',
      label: 'Music Brainz Identifier',
      validator: [Validators.pattern(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/)],
      errorMessage: 'Must be a 36 character hexadecimal number in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }

    return [
      name, url, playcount, mbid, {
        key: 'image', value: imageGroup
      }
    ]
  }
}
