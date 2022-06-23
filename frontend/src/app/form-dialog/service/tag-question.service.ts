import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { TagInfo } from 'src/app/model/tag-info';
import { InputQuestion } from '../model/input-question';
import { TextareaQuestion } from '../model/textarea-question';

@Injectable({
  providedIn: 'root'
})
export class TagQuestionService {

  constructor() { }

  getQuestions(tag: TagInfo = new TagInfo()) {
    const name: InputQuestion = {
      value: tag?.name || '',
      key: 'name',
      label: 'Tag name:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.required, Validators.pattern(/^[ A-Za-z0-9\-]{1,30}$/)],
      errorMessage: 'The tagname must be between 1 and 30 characters.'
    }

    const url: InputQuestion = {
      value: tag?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input',
      validator: [Validators.pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)],
      errorMessage: 'The home page of the tag must be a valid url.'
    }

    const total: InputQuestion = {
      controlType: 'input',
      type: 'number',
      value: tag?.total.toString() || '',
      key: 'total',
      label: 'Total'
    }

    const reach: InputQuestion = {
      controlType: 'input',
      type: 'number',
      value: tag?.reach.toString() || '',
      key: 'reach',
      label: 'Reach'
    }

    const description: TextareaQuestion = {
      controlType: 'textarea',
      rows: 10,
      cols: 100,
      value: tag.wiki?.content || '',
      key: 'description',
      label: 'Description',
      validator: [Validators.pattern(/[ A-Űa-ű0-9,;$\-\.!?+'"’“,”&@#\(\)<>\/=:…*—–Ǝ]{0,60000}/)],
      errorMessage: 'The wiki of the tag can contain at most 60000 characters. That\'s an awful lot!',
      pattern: /[ A-Űa-ű0-9,;$\-\.!?+\'"’“,”&@#\(\)<>\/=:…*—–Ǝ]{0,60000}/
    }

    return [name, url, total, reach, description]
  }
}
