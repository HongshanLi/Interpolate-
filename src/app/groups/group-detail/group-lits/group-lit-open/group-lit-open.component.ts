import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription } from "rxjs";
import { PDFDocumentProxy } from 'pdfjs-dist';
import { GroupsLitsService } from "../groups-lits.service";
import { GroupsService } from "@app/groups/groups.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { environment } from "@env/environment";
import { GroupThread } from "@app/models/groupThread.model";
import { GroupLitThreadsMgmtService } from
"@group-lit-threads-mgmt/group-lit-threads-mgmt.service";
import { GroupThreadsService } from "@app/groups/group-threads.service";

@Component({
  selector: 'app-group-lit-open',
  templateUrl: './group-lit-open.component.html',
  styleUrls: ['./group-lit-open.component.css']
})
export class GroupLitOpenComponent implements OnInit, OnDestroy {
  public pdfSrc: any;
  public page: number;
  public showCreateForm:boolean=false;
  public maxPage: number;
  private subscription : Subscription;

  private initX:number;
  private initY:number;
  private finalX:number;
  private finalY:number;
  private startingPoint:number;

  private img : any; // current page as canvas image data

  public size = 1;
  private mouseDown:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private litsService: GroupsLitsService,
    private groupThreadsService: GroupThreadsService,
    private litThreadsService: GroupLitThreadsMgmtService
  ) { }


  ngOnInit(){
    // if this component is activated through a thread-mgmt
    // then only display the single thread that activated this component
    this.page = this.litsService.getPageNumber();
    this.litsService.pageNumber.next(this.page);
    localStorage.setItem("pageNumber", this.page.toString());

    this.litsService.getPdf(
      localStorage.getItem("litId")
    ).subscribe(
      res => {
        this.pdfSrc = res
      }
    );


    this.subscription = this.litsService.pageNumberObs()
    .subscribe(
      res => {
        this.page = res;
      }
    );
  }

  loadComplete(pdf: PDFDocumentProxy){
    this.maxPage = pdf.numPages;
  //  this.litsService.pdfIsReady.next(true);
  }


  onPageRendered(event: CustomEvent){
    this.litsService.saveUnhighlightedCanvas();
  }


  toPreviousPage(){
    if(this.page > 1){
      this.litThreadsService.showThreadCreate.next(false);
      this.litThreadsService.showThreadUpdate.next(false);
      this.litThreadsService.showSingleThread.next(false);
      this.litThreadsService.pageNumberUpdated.next(true);
      this.litThreadsService.showThreadsList.next(true);
      this.page--;
      this.litsService.pageNumber.next(this.page);
      //localStorage.removeItem("threadToDisplay");

      this.litsService.setPageNumber(this.page.toString());
    }
  }

  toNextPage(){
    if(this.page < this.maxPage){

      this.litThreadsService.showThreadCreate.next(false);
      this.litThreadsService.showThreadUpdate.next(false);
      this.litThreadsService.showSingleThread.next(false);
      this.litThreadsService.pageNumberUpdated.next(true);
      this.litThreadsService.showThreadsList.next(true);

      this.page++;
      this.litsService.pageNumber.next(this.page);
      //localStorage.removeItem("threadToDisplay");

      this.litsService.setPageNumber(this.page.toString());
    }
  }

  navigateTo(event: Event){
    const navPage = parseInt((<HTMLInputElement>event.target).value, 10);
    if(isNaN(navPage)){
      return;
    }else{
      if(navPage < 1){
        this.page = 1;

        this.litsService.pageNumber.next(this.page);
        this.litThreadsService.showThreadsList.next(true);
        this.litThreadsService.showThreadCreate.next(false);
        this.litThreadsService.showThreadUpdate.next(false);
        this.litThreadsService.showSingleThread.next(false);
      } else if(navPage > this.maxPage){
        this.page = this.maxPage;

        this.litsService.pageNumber.next(this.page);

        this.litThreadsService.showThreadsList.next(true);
        this.litThreadsService.showThreadCreate.next(false);
        this.litThreadsService.showThreadUpdate.next(false);
        this.litThreadsService.showSingleThread.next(false);
      } else{
        this.page = navPage;

        this.litsService.pageNumber.next(this.page);

        this.litThreadsService.showThreadsList.next(true);
        this.litThreadsService.showThreadCreate.next(false);
        this.litThreadsService.showThreadUpdate.next(false);
        this.litThreadsService.showSingleThread.next(false);
      }
      (<HTMLInputElement>event.target).value = "";
      this.litsService.setPageNumber(this.page.toString());
      return;
    }
  }

  zoomIn(){
    this.size = this.size + 0.2;
  }

  zoomOut(){
    this.size = this.size - 0.2;
  }


  onMouseDown(event: MouseEvent){
    if(this.litsService.inHighlightMode){
      let totalOffsetX = 0;
      let totalOffsetY = 0;
      let canvasX = 0;
      let canvasY = 0;
      let currentElement = event.target as HTMLCanvasElement;

      do{
          totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
          totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while(currentElement = (currentElement.offsetParent as HTMLCanvasElement))

      canvasX = event.pageX - totalOffsetX;
      canvasY = event.pageY - totalOffsetY;

      this.initX = canvasX;
      this.initY = canvasY;
      this.startingPoint = canvasX;

    }

    this.mouseDown = true;

  }

  onMouseMove(event: MouseEvent){
    if(this.litsService.inHighlightMode && this.mouseDown){
      let totalOffsetX = 0;
      let totalOffsetY = 0;
      let canvasX = 0;
      let canvasY = 0;
      let currentElement = event.target as HTMLCanvasElement;

      do{
          totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
          totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while(currentElement = (currentElement.offsetParent as HTMLCanvasElement))

      canvasX = event.pageX - totalOffsetX;
      canvasY = event.pageY - totalOffsetY;

      let canvas = event.target as HTMLCanvasElement;
      let ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(this.startingPoint,this.initY);
      ctx.lineTo(canvasX, this.initY);
      ctx.strokeStyle= environment.strokeStyle;
      ctx.globalAlpha = environment.globalAlpha;
      ctx.lineWidth = environment.lineWidth;
      ctx.stroke();
      this.startingPoint = canvasX;
      }


  }


  onMouseUp(event: MouseEvent){
    if(this.litsService.inHighlightMode){
      let totalOffsetX = 0;
      let totalOffsetY = 0;
      let canvasX = 0;
      let canvasY = 0;
      let currentElement = event.target as HTMLCanvasElement;

      do{
          totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
          totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while(currentElement = (currentElement.offsetParent as HTMLCanvasElement))

      canvasX = event.pageX - totalOffsetX;
      canvasY = event.pageY - totalOffsetY;

      this.finalX = canvasX;
      this.finalY = canvasY;

      let highlightCoord : HighlightCoord = {
        initX: this.initX,
        initY: this.initY,
        finalX: this.finalX,
      }

      this.litsService.highlightsCoord.push(highlightCoord);

      this.mouseDown = false;

      /*
      let canvas = event.target as HTMLCanvasElement;
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(this.initX,this.initY);
      ctx.lineTo(this.finalX, this.initY);
      ctx.strokeStyle= "#00b8e6";
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 20;
      ctx.stroke();
      */
    }

  }


  clearHighlights(){
    this.litsService.clearHighlights();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();

    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

    localStorage.removeItem("pageNumber");
    localStorage.removeItem("litId");
    localStorage.removeItem("threadToDisplay");
    localStorage.removeItem("threadToUpdate");
    this.litThreadsService.threads = [];
  }


}
