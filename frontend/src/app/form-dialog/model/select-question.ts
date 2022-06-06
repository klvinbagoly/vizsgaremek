import { Question } from './question';
export class SelectQuestion extends Question<string> {

  override controlType: string = 'select';
  options: { key: string, value: string }[] = [];

  constructor(options: {
    [key: string]: any,
    options?: { key: string, value: string }[]
  } = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
