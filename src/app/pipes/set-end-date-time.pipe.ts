import { Pipe, PipeTransform, assertInInjectionContext } from '@angular/core';

@Pipe({
  name: 'setEndDateTime'
})
export class SetEndDateTimePipe implements PipeTransform {

  transform(value: Date, ...args: number[]): Date {
    let currentDate = new Date(value)
    let newDate = new Date(value);
    newDate.setMinutes(currentDate.getMinutes() + args[0]);
    return newDate
  }

}
