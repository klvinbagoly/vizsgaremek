import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(sec: number): string {
    if (typeof sec !== 'number') return 'Unknown'
    const minutes = Math.floor(sec / 60).toString().padStart(2, '0')
    const seconds = (sec % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

}
