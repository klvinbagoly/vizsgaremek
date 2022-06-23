import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
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
      label: 'Description',
      validator: [Validators.pattern(/[ A-Űa-ű0-9,;$\-\.!?+'"’“,”&@#\(\)<>\/=:…*—–Ǝ]{0,60000}/)],
      errorMessage: 'The wiki of the album can contain at most 60000 characters. That\'s an awful lot!',
      pattern: /[ A-Űa-ű0-9,;$\-\.!?+\'"’“,”&@#\(\)<>\/=:…*—–Ǝ]{0,60000}/
    }

    return [listeners, description, {
      key: 'tags', value: tagControls
    }]
  }
}
