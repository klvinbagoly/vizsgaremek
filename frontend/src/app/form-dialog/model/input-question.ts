import { Question } from "./question";

export class InputQuestion extends Question<string> {
  override controlType: string = 'input'
  type!: string

  constructor(options: {
    [key: string]: any,
    type?: string
  } = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
