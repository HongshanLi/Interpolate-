import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlightKeywords'
})
export class HighlightKeywordsPipe implements PipeTransform {

  transform(value: string, keywordsStr: string): any {
    keywordsStr = String.raw`${keywordsStr}`;

    console.log('value is', value);

    if (keywordsStr !== '') {
      const keywords = keywordsStr.split(' ');
      // highlightedText = value.split(keyword).join("<mark>"+keyword+"</mark>");
      for (const keyword of keywords) {
        const regex = new RegExp(keyword, 'gi');

        // find all matched str in value ignore cases
        const found = value.match(regex);
        if (found != null) {
          for (const match of found) {
            value = value.split(match).join('<mark>' + match + '</mark>');
          }
        }
      }

      return value;
    } else {
      return value;
    }
  }


}
