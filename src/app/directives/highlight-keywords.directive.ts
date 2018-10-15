import { Directive, ElementRef,
OnInit, Input, OnDestroy } from '@angular/core';

import {GroupThreadsService} from "@app/groups/group-threads.service";
import { Subscription } from "rxjs";


@Directive({
  selector: '[appHighlightKeywords]'
})
export class HighlightKeywordsDirective implements OnInit, OnDestroy {
  //@Input('appHighlightKeywords') keywords:string[];
  private keywords :string[]=[];
  private subscription : Subscription;

  constructor(
    private elementRef: ElementRef,
    private groupThreadsService: GroupThreadsService
  ) { }


  ngOnInit(){
    this.subscription = this.groupThreadsService.keywordsObs()
    .subscribe(
      res => {
        this.keywords = res;
        
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

/*
import { Directive, ElementRef,
  OnInit, Input, OnChanges } from "@angular/core";
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
*/
