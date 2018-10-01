import { Directive, ElementRef, OnInit, Input, OnChanges } from "@angular/core";
import "mathjax";

@Directive({
  selector: '[mathJax]'
})
export class MathJaxDirective implements OnInit, OnChanges {
  @Input('mathJax') mathContent:string;

  constructor(
    private elementRef: ElementRef
  ){}

  ngOnChanges(){
    this.elementRef.nativeElement.innerHTML = this.mathContent;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elementRef.nativeElement]);
  }

  ngOnInit(){}
}
