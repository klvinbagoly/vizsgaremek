import { Question } from './../model/question';
import { Injectable } from '@angular/core';
import { ArtistInfo } from 'src/app/model/artist-info';
import { SelectQuestion } from '../model/select-question';
import { ArtistQuestionService } from './artist-question.service';
import { Validators } from '@angular/forms';
import { TextareaQuestion } from '../model/textarea-question';

@Injectable({
  providedIn: 'root'
})
export class ArtistInfoQuestionService {

  constructor(
    private artistService: ArtistQuestionService
  ) { }

  getQuestions(artist: ArtistInfo = new ArtistInfo()) {
    const ontour: SelectQuestion = {
      controlType: 'select',
      value: artist.ontour || '0',
      key: 'ontour',
      label: 'On tour',
      options: [
        { key: '0', value: '0' },
        { key: '1', value: '1' },
      ]
    }

    const similarArtists = artist.similar.artist || []
    const similarControls = similarArtists.map(artist => [
      {
        value: artist?.name || '',
        key: 'name',
        label: 'Artist name:',
        type: 'text',
        controlType: 'input',
        validator: [Validators.required]
      },
      {
        value: artist?.url || '',
        key: 'url',
        label: 'Url:',
        type: 'text',
        controlType: 'input'
      },
      {
        key: 'image',
        value: this.artistService.createImageGroup(artist.image)
      }

    ])

    const tags = artist.tags.tag || []
    const tagControls = tags.map(tag => [
      {
        value: tag?.name || '',
        key: 'name',
        label: 'Tag name:',
        type: 'text',
        controlType: 'input',
        validator: [Validators.required]
      },
      {
        value: tag?.url || '',
        key: 'url',
        label: 'Url:',
        type: 'text',
        controlType: 'input'
      }
    ])

    const bio: TextareaQuestion = {
      controlType: 'textarea',
      rows: 10,
      cols: 100,
      value: artist.bio.content,
      key: 'bio',
      label: 'Bio'
    }

    return [
      ontour,
      bio,
      { key: 'similar', value: similarControls },
      { key: 'tags', value: tagControls },

    ]

  }
}
