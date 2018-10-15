import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightKeyWords'
})
export class HighlightKeyWordsPipe implements PipeTransform {

  transform(value: any, keywords: string[]): any {


    return null;
  }

}
