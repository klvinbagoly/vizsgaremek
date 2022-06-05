import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deep'
})
export class DeepPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value !== 'object') return value.toString()
    const values = Object.values(value)
    values.forEach(value => {
      if (typeof value === 'object') {
        value = this.transform(value)
      }
    })

    return values.join(', ')
  }

}
