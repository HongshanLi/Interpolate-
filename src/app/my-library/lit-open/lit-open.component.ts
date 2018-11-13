import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription } from "rxjs";
import { PDFDocumentProxy } from 'pdfjs-dist';
import { LibraryService } from "@app/my-library/library.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { environment } from "@env/environment";

@Component({
  selector: 'app-lit-open',
  templateUrl: './lit-open.component.html',
  styleUrls: ['./lit-open.component.css']
})
export class LitOpenComponent implements OnInit, OnDestroy {
  private litId: string;
  public fileSrc: any;
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
    private libraryService: LibraryService,
  ) { }


  ngOnInit(){
    // if this component is activated through a thread-mgmt
    // then only display the single thread that activated this component
    this.page = this.libraryService.getPageNumber();
    localStorage.setItem("pageNumber", this.page.toString());

    const litInfo = JSON.parse(
      localStorage.getItem("litInfo")
    );

    this.libraryService.getFile(
      JSON.parse(
        localStorage.getItem("litInfo")
      )
    ).subscribe(
      res => {

        if(litInfo.fileType=="jpeg" || litInfo.fileType=="png"){
          //const bytes = new Uint8Array(this.file);

          //var image = document.getElementById('file');
          //image.src = 'data:image/png;base64,'+this.encode(bytes);
        }

        if(litInfo.fileType=="pdf"){
          this.fileSrc = res;
        }

      }
    );

    this.subscription = this.libraryService.pageNumberObs()
    .subscribe(
      res => {
        this.page = res;
      }
    );
  }

  encode (input: any) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
  }

  loadComplete(pdf: PDFDocumentProxy){
    this.maxPage = pdf.numPages;
  //  this.libraryService.pdfIsReady.next(true);
  }


  onPageRendered(event: CustomEvent){
    this.libraryService.saveUnhighlightedCanvas();
  }


  toPreviousPage(){
    if(this.page > 1){
      this.page--;
      this.libraryService.pageNumber.next(this.page);
      //localStorage.removeItem("threadToDisplay");

      this.libraryService.setPageNumber(this.page.toString());
    }
  }

  toNextPage(){
    if(this.page < this.maxPage){



      this.page++;
      this.libraryService.pageNumber.next(this.page);
      //localStorage.removeItem("threadToDisplay");

      this.libraryService.setPageNumber(this.page.toString());
    }
  }

  navigateTo(event: Event){
    const navPage = parseInt((<HTMLInputElement>event.target).value, 10);
    if(isNaN(navPage)){
      return;
    }else{
      if(navPage < 1){
        this.page = 1;

        this.libraryService.pageNumber.next(this.page);

      } else if(navPage > this.maxPage){
        this.page = this.maxPage;

        this.libraryService.pageNumber.next(this.page);

      } else{
        this.page = navPage;

        this.libraryService.pageNumber.next(this.page);


      }
      (<HTMLInputElement>event.target).value = "";
      this.libraryService.setPageNumber(this.page.toString());
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
    if(this.libraryService.inHighlightMode){
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
    if(this.libraryService.inHighlightMode && this.mouseDown){
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
    if(this.libraryService.inHighlightMode){
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

      this.libraryService.highlightsCoord.push(highlightCoord);

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
    this.libraryService.clearHighlights();
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
    localStorage.removeItem("pageNumber");
    localStorage.removeItem("litId");
    localStorage.removeItem("threadToDisplay");
    localStorage.removeItem("threadToUpdate");
  }


}
