import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLength'
})
export class StrLengthPipe implements PipeTransform {

  transform(value:any): any {
    if (value == 0) {
    value ='首页banner'
    }
    if (value == 1) {
    value ='找职位banner'
   }
    if (value == 2) {
    value ='找精英'
  }
    if (value == 3) {
    value ='行业大图'
  }
  return value;
  }

}
