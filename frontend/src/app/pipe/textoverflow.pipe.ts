import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textoverflow'
})
export class TextoverflowPipe implements PipeTransform {

  transform(value: string, length: number): string {
    if (value.length < length) return value
    return `${value.slice(0, length)}...`
  }

}
