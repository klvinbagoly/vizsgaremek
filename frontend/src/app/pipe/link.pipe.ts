import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(str: string): string {
    if (str.startsWith('https://')) {
      return `<a target="_blank" href="${str}">${str}</a>`
    }
    return str
  }

}
