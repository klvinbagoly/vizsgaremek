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
      validator: [Validators.required]
    }

    const url: InputQuestion = {
      value: album?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input'
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
      validator: [Validators.pattern(/^[0-9a-z\-]{36}$/)]
    }

    return [
      name, url, playcount, mbid, {
        key: 'image', value: imageGroup
      }
    ]
  }
}
