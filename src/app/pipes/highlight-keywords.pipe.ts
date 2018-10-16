import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightKeywords'
})
export class HighlightKeywordsPipe implements PipeTransform {

  transform(value: any, keywordsStr: string): any {
    let highlightedText : string;
    const keywords = keywordsStr.split(" ");

    //highlightedText = value.split(keyword).join("<mark>"+keyword+"</mark>");
    for (let keyword of keywords){
      highlightedText = value.split(keyword)
      .join("<mark>"+keyword+"</mark>")
    }

    return highlightedText;
  }


}
