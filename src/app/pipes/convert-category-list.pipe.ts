import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCategoryList'
})
export class ConvertCategoryListPipe implements PipeTransform {

  transform(value: any, ...args: string[]): string {
    let retstr = ""
    if (value.length > 0){
      for (let i = 0; i < value.length; i++) {
        retstr += value[i].name + ", "
      }

    }
    return retstr.slice(0, -2);
  }

}
