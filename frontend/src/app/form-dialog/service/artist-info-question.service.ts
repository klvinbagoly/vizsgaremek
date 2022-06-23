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
        { key: '0', value: 'No' },
        { key: '1', value: 'Yes' },
      ]
    }

    const similarArtists = artist.similar.artist || []
    const similarControls = this.createSimilarGroup(similarArtists)


    const tags = artist.tags.tag || []
    const tagControls = this.createTagGroup(tags)

    const bio: TextareaQuestion = {
      controlType: 'textarea',
      rows: 10,
      cols: 100,
      value: artist.bio.content,
      key: 'bio',
      label: 'Bio',
      validator: [Validators.pattern(/[ A-Űa-ű0-9,;$\-\.!?+'"’“,”&@#\(\)<>\/=:…*—–Ǝ]{0,60000}/)],
      errorMessage: 'The biography of the artist can contain at most 60000 characters. That\'s an awful lot!',
      pattern: /[ A-Űa-ű0-9,;$\-\.!?+\'"’“,”&@#\(\)<>\/=:…*—–Ǝ]{0,60000}/
    }

    return [
      ontour,
      bio,
      { key: 'similar', value: similarControls },
      { key: 'tags', value: tagControls },

    ]

  }

  createSimilarGroup(similar: any[]) {
    return similar.map(artist => [
      {
        value: artist?.name || '',
        key: 'name',
        label: 'Artist name:',
        type: 'text',
        controlType: 'input',
        validator: [Validators.required, Validators.pattern(/^[ A-Űa-ű0-9,$\-\.!?+'"&@#]{1,30}$/)],
        errorMessage: 'The name of the artist must be between 1 and 30 characters.'
      },
      {
        value: artist?.url || '',
        key: 'url',
        label: 'Url:',
        type: 'text',
        controlType: 'input',
        validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
        errorMessage: 'The home page of the artist must be a valid url.'
      },
      {
        key: 'image',
        value: this.artistService.createImageGroup(artist.image)
      }

    ])
  }

  createTagGroup(tags: any[]) {
    return tags.map(tag => [
      {
        value: tag?.name || '',
        key: 'name',
        label: 'Tag name:',
        type: 'text',
        controlType: 'input',
        validator: [Validators.required, Validators.pattern(/[ A-Za-z0-9\-]{1,30}/)],
        errorMessage: 'The tagname must be between 1 and 30 characters.'
      },
      {
        value: tag?.url || '',
        key: 'url',
        label: 'Url:',
        type: 'text',
        controlType: 'input',
        validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
        errorMessage: 'The home page of the tag must be a valid url.'
      }
    ])
  }
}
