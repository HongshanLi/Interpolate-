import {
   Directive,
  OnInit,
  ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer) { }

  ngOnInit(){
    console.log("Native element", this.elRef)
  }

  @HostListener("inHighlightMode") changeCursor(event: Event){
    console.log(event);
  }







}
