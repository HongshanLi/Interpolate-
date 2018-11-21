// open and render the file

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { Subscription } from "rxjs";
import { PDFDocumentProxy } from 'pdfjs-dist';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@env/environment";
import { CommunicationService } from "@app/communication.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { EntityDocumentsService } from "@app/entity-documents/entity-documents.service";
import { Document } from "@app/models/document.model";
import { mimeType } from "@app/helpers/mime-type.validator";

import { MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import{ Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-doc-display',
  templateUrl: './doc-display.component.html',
  styleUrls: ['./doc-display.component.css']
})
export class DocDisplayComponent implements OnInit {
  public uploadForm : FormGroup;
  public fileTypeValid: boolean = false;

  private entityType :string;
  public entityName: string;
  private entityId: string;
  public docsInEntity: Document[]=[];

  public documentId: string;

  public documentSrc : any;
  public maxPage: number;
  public size: number;
  public page: number = 1;
  private sub: Subscription;

  private apiUrl = environment.apiUrl + "/documents/file";

  //highlight
  private initX: number;
  private initY: number;
  private finalX: number;
  private finalY: number;
  private startingPoint: number;
  private mouseDown : boolean = false;


  private inHighlightMode : boolean = false;

  private unHighlightedCanvas: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private bottomSheet: MatBottomSheet,
    private comm: CommunicationService,
    private docsService: EntityDocumentsService,
  ) { }

  ngOnInit() {

    this.uploadForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),

      authors: new FormControl(null,
        { validators: [Validators.required] }),

      file: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: []
      })
    });


    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.entityType = paramMap.get("entityType");
        this.entityName = paramMap.get("entityName");
        this.entityId = paramMap.get("entityId");

        this.docsService.getEntityDocuments(
          this.entityType, this.entityId
        );

      }
    );

    this.sub = this.comm.documentIdUpdated.subscribe(
      res => {
        this.documentId = res;
        this.getDocById(this.documentId).subscribe(
          res => {
            this.documentSrc = res;
          }
        );
      }
    );

    this.sub= this.docsService.docsUpdatedObs()
    .subscribe(
      res => {
        this.docsInEntity = res;
      }
    );

    this.sub = this.comm.pageUpdated.subscribe(
      res => {
        this.page = res;
      }
    );

    this.sub = this.comm.inHighlightMode.subscribe(
      res => {
        this.inHighlightMode = res;
        const destCanv = document.getElementsByTagName("canvas")[0];
        if(this.inHighlightMode){
          destCanv.style.cursor = "text"
        }else{
          destCanv.style.cursor = "default"
        }
      }
    )

    this.sub = this.comm.showHighlight.subscribe(
      res => {
        this.comm.highlightsCoord = res.coords;

        if(this.page == res.page){
          // direct plot high;
          const canvas = document.getElementsByTagName("canvas")[0];
          const ctx = canvas.getContext("2d");
          for (let line of this.comm.highlightsCoord){
            ctx.beginPath();
            ctx.moveTo(line.initX,line.initY);
            ctx.lineTo(line.finalX, line.initY);
            ctx.strokeStyle = environment.strokeStyle;
            ctx.globalAlpha = environment.globalAlpha;
            ctx.lineWidth = environment.lineWidth;
            ctx.stroke();
          }

        }else{
          this.page = res.page;
          // render new page and plot hi
        }

      }
    )

    this.sub = this.comm.clearHighlight.subscribe(
      res => {

        this.comm.highlightsCoord = [];
        const destCanv = document.getElementsByTagName("canvas")[0]
        if(destCanv){
          const ctx = destCanv.getContext("2d");
          ctx.putImageData(this.unHighlightedCanvas, 0, 0);
        }
      
      }
    );
  }

  // upload
  onFileSelected(event: Event){

    const file = (event.target as HTMLInputElement).files[0];

    // verify mimetype
    if(mimeType(file)){
      this.fileTypeValid = true
      this.uploadForm.patchValue({
        file: file,
        title: file.name
       });

      this.uploadForm.get("file").updateValueAndValidity();

      this.uploadFile();

    }else{
      this.fileTypeValid = false
    }
  }

  private uploadFile(){

    let docInfo : Document = {
      _id : null,
      title: this.uploadForm.value.title,
      authors: this.uploadForm.value.authors,
      userId: null,
      entityType: this.entityType,
      entityId: this.entityId,
      uploadTime: Date.now(),
      fileType: this.uploadForm.value.file.type,
    }

    this.docsService.saveDocInfo(
      docInfo,
      this.uploadForm.value.file);

    this.uploadForm.reset();
  }

  // open a document
  open(): void {
    this.bottomSheet.open(DocsInEntityBottomSheet, {
      data: {
        docsInEntity: this.docsInEntity,
        entityType: this.entityType,
        entityName: this.entityName,
        entityId: this.entityId,

      }
    });
  }

  // For PDF Document
  getDocById(docId:string){
    const params = new HttpParams()
    .set("_id", docId);

    return this.http.get(this.apiUrl, {
      params: params,
      responseType: "arraybuffer"
    });
  }

  loadComplete(pdf: PDFDocumentProxy){
    this.maxPage = pdf.numPages;

  }

  onPageRendered(event: CustomEvent){
    //save a copy

    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext("2d");
    this.unHighlightedCanvas =
    ctx.getImageData(0, 0, canvas.width, canvas.height);

    // plot highlight
    if(this.comm.highlightsCoord.length > 0){
      for (let line of this.comm.highlightsCoord){
        ctx.beginPath();
        ctx.moveTo(line.initX,line.initY);
        ctx.lineTo(line.finalX, line.initY);
        ctx.strokeStyle = environment.strokeStyle;
        ctx.globalAlpha = environment.globalAlpha;
        ctx.lineWidth = environment.lineWidth;
        ctx.stroke();
      }
    }

  }


  toPreviousPage(){
    if(this.page > 1){
      this.page--;
      this.comm.highlightsCoord = [];
      this.comm.pageUpdated.next(this.page);
    }
  }

  toNextPage(){
    if(this.page < this.maxPage){
      this.page++
      this.comm.highlightsCoord = [];
      this.comm.pageUpdated.next(this.page);
    }
  }

  navigateTo(event: Event){
    const navPage = parseInt((<HTMLInputElement>event.target).value, 10);
    if(isNaN(navPage)){
      //this.router.navigate(["groups", this.groupName, this.groupId, this.litId]);
      return;
    }else{
      this.comm.highlightsCoord = [];

      if(navPage < 1){
        this.page = 1;
        //this.router.navigate(["groups", this.groupName, this.groupId, this.litId]);

      } else if(navPage > this.maxPage){
        this.page = this.maxPage;

      } else{
        this.page = navPage;
      }
      this.comm.pageUpdated.next(this.page);

      (<HTMLInputElement>event.target).value = "";
      return;
    }
  }

  zoomIn(){
    this.size = this.size + 0.2;
  }

  zoomOut(){
    this.size = this.size - 0.2;
  }



  mousedown(event: MouseEvent){

    if(this.inHighlightMode){
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

      this.mouseDown = true;

    }


  }

  mousemove(event: MouseEvent){
    if(this.inHighlightMode && this.mouseDown){
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




  mouseup(event: MouseEvent){

    if(this.inHighlightMode){
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

      this.comm.highlightsCoord.push(highlightCoord);

      this.mouseDown = false;

    }

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}


@Component({
  templateUrl: 'docs-in-entity-bottom-sheet.html',
})
export class DocsInEntityBottomSheet {
  public docsInEntity: Document[] = [];
  private entityType:string;
  private entityName: string;
  private entityId:string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private comm: CommunicationService,
    private bottomSheetRef: MatBottomSheetRef<DocsInEntityBottomSheet>) {}

  ngOnInit(){
    this.docsInEntity = this.data.docsInEntity;
    this.entityType = this.data.entityType;
    this.entityName = this.data.entityName;
    this.entityId = this.data.entityId;

  }


  openLink(event: MouseEvent, doc: Document): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    this.comm.documentIdUpdated.next(doc._id)
  }




}
