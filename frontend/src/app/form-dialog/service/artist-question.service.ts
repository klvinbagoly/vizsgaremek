import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Artist } from 'src/app/model/artist';
import { InputQuestion } from '../model/input-question';
import { Question } from '../model/question';
import { SelectQuestion } from '../model/select-question';

@Injectable({
  providedIn: 'root'
})
export class ArtistQuestionService {

  constructor(
  ) { }


  getQuestions(artist?: Artist) {
    const name: InputQuestion = {
      value: artist?.name || '',
      key: 'name',
      label: 'Artist name:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.required, Validators.pattern(/^[ A-Űa-ű0-9,$\-\.!?+'"&@#]{1,30}$/)],
      errorMessage: 'The name of the artist must be between 1 and 30 characters.'
    }

    const url: InputQuestion = {
      value: artist?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
      errorMessage: 'The home page of the artist must be a valid url.'
    }

    const images = artist?.image || [{ url: '', size: '' }]
    const imageGroup: Array<Array<Question<any>>> = this.createImageGroup(images)

    const streamable: SelectQuestion = {
      controlType: 'select',
      options: [
        { key: '0', value: 'No' },
        { key: '1', value: 'Yes' },
      ],
      value: artist?.streamable || '',
      key: 'streamable',
      label: 'Streamable'
    }
    const playcount: InputQuestion = {
      controlType: 'input',
      type: 'number',
      value: artist?.playcount || '',
      key: 'playcount',
      label: 'Playcount'
    }
    const listeners: InputQuestion = {
      controlType: 'input',
      type: 'number',
      value: artist?.listeners || '',
      key: 'listeners',
      label: 'Listeners'
    }
    const mbid: InputQuestion = {
      controlType: 'input',
      type: 'text',
      value: artist?.mbid || '',
      key: 'mbid',
      label: 'Music Brainz Identifier',
      validator: [Validators.pattern(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/)],
      errorMessage: 'Must be a 36 character hexadecimal number in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }

    return [
      name, url, playcount, listeners, mbid, streamable, {
        key: 'image', value: imageGroup
      }
    ]

  }

  createImageGroup(images: any[]) {
    return images.map(image => ([
      {
        value: image.url || '',
        key: 'url',
        label: 'Image url',
        type: 'text',
        controlType: 'input',
        validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
        errorMessage: 'The image must come from a valid url.'
      },
      {
        value: image.size || '',
        key: 'size',
        label: 'Size',
        controlType: 'select',
        options: [
          { key: 'small', value: 'small' },
          { key: 'medium', value: 'medium' },
          { key: 'large', value: 'large' },
          { key: 'extralarge', value: 'extralarge' },
          { key: 'mega', value: 'mega' },
        ]
      }
    ]))
  }


}
