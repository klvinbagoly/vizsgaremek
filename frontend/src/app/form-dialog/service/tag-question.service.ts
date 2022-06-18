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
      validator: [Validators.required]
    }

    const url: InputQuestion = {
      value: tag?.url || '',
      key: 'url',
      label: 'Url:',
      type: 'text',
      controlType: 'input'
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
      label: 'Description'
    }

    return [name, url, total, reach, description]
  }
}
