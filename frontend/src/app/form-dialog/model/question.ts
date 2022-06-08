import { ValidatorFn } from "@angular/forms";

export class Question<T> {
  [key: string]: any;
  value!: T;
  key!: string;
  label!: string;
  required?: boolean;
  validator?: ValidatorFn[] | null;
  controlType!: string;

  constructor(options: {
    [key: string]: any;
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    validator?: ValidatorFn[] | null,
    controlType?: string,
  }) {
    for (let key in options) {
      this[key] = options[key]
    }
  }
}
