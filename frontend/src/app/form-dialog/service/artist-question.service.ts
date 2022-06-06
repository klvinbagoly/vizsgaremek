import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Artist } from 'src/app/model/artist';
import { InputQuestion } from '../model/input-question';
import { Question } from '../model/question';
import { SelectQuestion } from '../model/select-question';
import { QuestionControlService } from './question-control.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistQuestionService {

  constructor(
    private qService: QuestionControlService
  ) { }


  getQuestions(artist?: Artist) {
    const name: InputQuestion = {
      value: artist?.name || '',
      key: 'name',
      label: 'Artist name:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.required]
    }

    const url: InputQuestion = {
      value: artist?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input'
    }

    const images = artist?.image || [{ url: '', size: '' }]
    const imageGroup: Array<{ url: InputQuestion, size: SelectQuestion }> =
      images.map(image => ({
        url: {
          value: image.url || '',
          key: 'url',
          label: 'Image url',
          type: 'text',
          controlType: 'input'
        },
        size: {
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
      }))

    const streamable: InputQuestion = {
      controlType: 'input',
      type: 'checkbox',
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
      validator: [Validators.pattern(/^[0-9a-z\-]{36}$/)]
    }

    return this.qService.toFormGroup([
      name, url, playcount, listeners, mbid, streamable, {
        key: 'image', value: imageGroup
      }
    ])

  }


}
