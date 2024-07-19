import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationConversion'
})
export class DurationConversionPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let formattedTime = ""
    let hours = (value / 60);
    let roundedHours = Math.floor(hours);
    let minutes = (hours - roundedHours) * 60;
    let roundedMins = Math.round(minutes);
    formattedTime+= roundedHours.toString() + " hour(s) ";
    if (roundedMins) {
        formattedTime+= roundedMins.toString() + " minute(s)";
    }
    return formattedTime
  }

}
