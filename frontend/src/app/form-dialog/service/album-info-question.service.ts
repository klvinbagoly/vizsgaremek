import { Injectable } from '@angular/core';
import { AlbumInfo } from 'src/app/model/album-info';
import { InputQuestion } from '../model/input-question';
import { TextareaQuestion } from '../model/textarea-question';
import { ArtistInfoQuestionService } from './artist-info-question.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumInfoQuestionService {

  constructor(
    private artistInfoQuestionService: ArtistInfoQuestionService
  ) { }

  getGuestions(album: AlbumInfo = new AlbumInfo()) {
    const tags = album.tags.tag || []
    const tagControls = this.artistInfoQuestionService.createTagGroup(tags)

    const listeners: InputQuestion = {
      controlType: 'input',
      type: 'number',
      value: album?.listeners || '',
      key: 'listeners',
      label: 'Listeners'
    }

    const description: TextareaQuestion = {
      controlType: 'textarea',
      rows: 10,
      cols: 100,
      value: album.wiki?.content || '',
      key: 'description',
      label: 'Description'
    }

    return [listeners, description, {
      key: 'tags', value: tagControls
    }]
  }
}
