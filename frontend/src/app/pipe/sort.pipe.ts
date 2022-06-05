import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<any> | null, direction: number = 1, ...keys: string[]): Array<any> {
    if (!array) return []
    if (direction > 0) return array.sort((a, b) => this.sortHelper(a, b, keys))
    return array.sort((a, b) => this.sortHelper(b, a, keys))
  }

  findValue(obj: any, keys: string[]): any {
    keys.forEach(key => obj = obj[key])
    return obj
  }

  sortHelper(a: any, b: any, keys: string[]): number {
    if (typeof a === 'number') return a - b
    if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b)
    if (typeof a === 'string') return a.localeCompare(b)
    if (typeof a === 'object') return this.sortHelper(this.findValue(a, keys), this.findValue(b, keys), keys)
    return 0
  }

}
