import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HighlightCoord } from "@app/models/highlightCoord";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // page updated in doc-display component

  public docIdAndPageUpdated = new Subject<{
    documentId: string,
    page: number
  }>();



  public documentIdUpdated = new Subject<string>();

  public pageUpdated = new Subject<number>();
  public inHighlightMode = new Subject<boolean>();

  public showHighlight = new Subject<{
    documentId: string,
    page: number,
    coords: HighlightCoord[]}>();

  public clearHighlight = new Subject<boolean>();


  public highlightsCoord : HighlightCoord[] = [];

  constructor() { }
}
