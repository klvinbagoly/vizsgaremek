import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from '../../model/question';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() question!: Question<any>
  @Input() form!: FormGroup
  constructor() { }

  ngOnInit(): void {
  }

  get IsValid() {
    return true
  }

}
