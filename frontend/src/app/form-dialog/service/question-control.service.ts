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
      console.log(typeof question.value)
      if (typeof question.value === 'string') {
        group[question.key] = new FormControl(question.value || '', question.validator)
      } else if (Array.isArray(question.value)) {
        group[question.key] = this.toFormArray(question.value)
      } else {
        group[question.key] = question.value
      }
    });
    console.log(group)
    return new FormGroup(group)
  }

  toFormArray(question: any[]): FormArray {
    console.log(question)
    const group = question.map(question => this.toFormGroup(question))
    return new FormArray(group)
  }
}
