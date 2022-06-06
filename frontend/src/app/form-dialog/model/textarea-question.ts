import { Question } from "./question";

export class TextareaQuestion extends Question<string> {
  override controlType: string = 'input'
  rows!: number
  cols!: number

  constructor(options: {
    [key: string]: any,
    rows?: number,
    cols?: number
  } = {}) {
    super(options);
    this.rows = options['rows'] || 5;
    this.cols = options['rows'] || 20;
  }
}
