import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }

  toFormGroup(question: any[]): FormGroup {
    let group: { [key: string]: any } = {};

    question.forEach(question => {
      if (question instanceof Question) {
        group[question.key] = new FormControl(question.value || '', question.validator)
      } else {
        group[question.key] = question.value
      }
    });
    return new FormGroup(group)
  }

  toFormArray(question: any[]): FormArray {
    const group = question.map(question => this.toFormGroup(question))
    return new FormArray(group)
  }
}
