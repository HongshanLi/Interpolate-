import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // page updated in doc-display component
  public pageUpdated = new Subject<number>();

  
  constructor() { }
}
