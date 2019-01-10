import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGetPosition]'
})
export class GetPositionDirective {

  constructor(
    public el: ElementRef
  ) { }

  ngOnInit(){
    var rect = this.el.nativeElement;
    console.log(Object.keys(rect));
  }

}
