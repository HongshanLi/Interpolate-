import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { PDFDocumentProxy, PDFSource } from 'pdfjs-dist';
import { GroupsLitsService } from "../groups-lits.service";
import { Subscription } from "rxjs";
import { GroupsService } from "@app/groups/groups.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { environment } from "@env/environment";
import { SearchService } from "@app/generalServices/search.service";
import { GroupThread } from "@app/models/groupThread.model";
interface Callback {
  (error, result?: boolean): void;
}

@Component({
  selector: 'app-group-lit-open',
  templateUrl: './group-lit-open.component.html',
  styleUrls: ['./group-lit-open.component.css']
})
export class GroupLitOpenComponent implements OnInit, OnDestroy, OnChanges {
  private litId: string;
  public pdfSrc: any;
  public page: number;
  public showCreateForm:boolean=false;
  public maxPage: number;

  private createThread = false;
  private groupName: string;

  private pageNumberSub: Subscription;
  private pdfIsReadySub: Subscription;
  private threadIsReadySub: Subscription;


  private initX:number;
  private initY:number;
  private finalX:number;
  private finalY:number;
  private startingPoint:number;

  private img : any; // current page as canvas image data


  public pageList = [];

  public size = 1;

  private mouseDown:boolean = false;

  private pdfIsReady = false;
  private threadIsReady = false;

  public showAllThreads:boolean = true;
  public showSearchThreads:boolean = false;

  public matchedThreads : GroupThread[] = [];

  @Input() queryStr: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private litsService: GroupsLitsService,
    private groupsService: GroupsService,
    private searchService: SearchService
  ) { }

  ngOnChanges(changes: SimpleChanges){
  }

  ngOnInit(){
    // if this component is activated through a thread-mgmt
    // then only display the single thread that activated this component

    this.page = this.litsService.getPageNumber();

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.litId = paramMap.get("litId");
        this.litsService.getPdf(this.litId).subscribe(
          res => {
            this.pdfSrc = res
            console.log(this.pdfSrc);
          }
        );
      }
    );
  }


  loadComplete(pdf: PDFDocumentProxy){
    this.maxPage = pdf.numPages;
  }


  onPageRendered(event: CustomEvent){
    this.litsService.saveUnhighlightedCanvas();
    this.litsService.pdfIsReady.next(true);
  }


  toPreviousPage(){
    if(this.page > 1){

      this.page--;
      this.litsService.setPageNumber(this.page.toString());
      this.threadsService.removeThreadToDisplay();

    }
  }

  toNextPage(){
    if(this.page < this.maxPage){
      this.page++;
      this.litsService.setPageNumber(this.page.toString());
      this.threadsService.removeThreadToDisplay();
    }
  }

  navigateTo(event: Event){
    const navPage = parseInt((<HTMLInputElement>event.target).value, 10);
    if(isNaN(navPage)){
      return;
    }else{
      if(navPage < 1){
        this.page = 1;
      } else if(navPage > this.maxPage){
        this.page = this.maxPage;
      } else{
        this.page = navPage;
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

  _showAllThreads(){
    this.queryStr = "";
    this.showAllThreads = true;
    this.showSearchThreads = false;
  }

  _showSearchThreads(){
    this.showAllThreads = false;
    this.showSearchThreads = true;
    this.litsService.clearHighlights();
  }

  _showCreateThread(){
    //this.showCreateForm = true;
    this.threadsService.createThread.next(true);
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

  searchThread(event: Event){
    this._showSearchThreads();

    const queryStr = (<HTMLInputElement>event.target).value;
    this.searchService.searchGroupThreads(queryStr, this.litId).subscribe(
      res => {
        this.matchedThreads = res.threads;
      }
    );
  }



  navigateToThisThread(thread:GroupThread){
    this.litsService.setPageNumber(thread.pageNumber.toString());
    this.threadsService.setThreadToDisplay(thread._id)
    this.page = thread.pageNumber;
    this.showAllThreads = true;
    this.showSearchThreads = false;

  }


  clearHighlights(){
    this.litsService.clearHighlights();
  }

  ngOnDestroy(){
    localStorage.removeItem("pageNumber");
    localStorage.removeItem("litId");
    this.threadsService.removeThreadToDisplay();
  }


}
