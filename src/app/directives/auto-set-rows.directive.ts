import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoSetRows]'
})
export class AutoSetRowsDirective {
  // automatically set rows for annotation content form control

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {

    const windowHeight = window.innerHeight;
    this.el.nativeElement.rows = Math.floor(windowHeight / 38);
  }
}
