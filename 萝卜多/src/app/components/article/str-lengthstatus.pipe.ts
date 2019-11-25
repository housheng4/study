import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLengthstatus'
})
export class StrLengthstatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == 2) {
      value = "上线"
    }
    if (value == 1) {
      value = "草稿"
    }
    return value
  }

}
