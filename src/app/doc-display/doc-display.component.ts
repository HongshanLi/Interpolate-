// open and render the file

import { Component, OnInit, OnDestroy, Input,
OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { Subscription } from "rxjs";
import { PDFDocumentProxy } from 'pdfjs-dist';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@env/environment";
import { CommunicationService } from "@app/communication.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { EntityDocumentsService } from
"@app/entity-documents/entity-documents.service";


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

  public documentId: string = null;

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
  public highlightDisplayed: boolean = false;

  private cleanCanvas: any;

  @Input("userCanUpload") userCanUpload : boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private bottomSheet: MatBottomSheet,
    private comm: CommunicationService,
    private docsService: EntityDocumentsService,
  ) { }

  ngOnChanges(changes: SimpleChanges){
  }

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

        if(!this.entityType){
          this.entityType = "my-library";
          this.entityName = "my-library";
          this.entityId = "my-library"
        }


        this.docsService.getEntityDocuments(
          this.entityType, this.entityId
        );
      }
    );

    this.sub = this.comm.docIdAndPageUpdated.subscribe(
      res => {

        if(this.documentId != res.documentId){
          this.documentId = res.documentId

          this.getDocById(this.documentId).subscribe(
            res => {
              this.documentSrc = res;
            }
          );
        }

        if(this.page !== res.page){
          //this.page = res.page

        }


      }
    );

    this.sub= this.docsService.docsUpdatedObs()
    .subscribe(
      res => {
        this.docsInEntity = res;
        if(this.documentId===null){

          this.bottomSheet.open(DocsInEntityBottomSheet, {
            data: {
              docsInEntity: this.docsInEntity,
              entityType: this.entityType,
              entityName: this.entityName,
              entityId: this.entityId,

            }
          });
        }
      }
    );


    this.sub = this.docsService.docsAction.subscribe(
      res => {
        if(res.action === 'upload'){
          const uploadedDoc = res.docInfo;

          this.bottomSheet.open(DocumentAlertBottomSheet, {
            data: {
              action: res.action,
              alertMessage: uploadedDoc.title + " has been successfully uploaded",
              docInfo: uploadedDoc
            }
          });
        }
      }
    )



    this.sub = this.comm.inHighlightMode.subscribe(
      res => {

        console.log("In highlight mode?", this.inHighlightMode);

        const destCanv = document.getElementsByTagName("canvas")[0];
        const ctx = destCanv.getContext("2d");

        if(res){
          this.saveCleanCanvas().then(
            result => {
              this.inHighlightMode = true;
            }
          );

          destCanv.style.cursor = "text";
        }else{
          this.inHighlightMode = false;
          destCanv.style.cursor = "default"
        }
      }
    )

    this.sub = this.comm.showHighlight.subscribe(
      res => {

        // When user clicked display highlight, the user should be already
        // on the page.
        console.log("displaying highlight on page ",
          res.page, " of ", res.documentId);
        console.log("Highlighted area: ", res.coords);

        this.saveCleanCanvas().then(
          result => {
            this.plotHighlight(res.coords);
            this.highlightDisplayed = true;
          }
        );

      }
    );


    this.sub = this.comm.clearHighlight.subscribe(
      res => {
        this.clearHighlight().then(
          result => {
            console.log("Highlight cleared")
          }
        );
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
      this.bottomSheet.open(DocumentAlertBottomSheet, {
        data: {
          alertMessage: "We only support PDF document for now!"
        }
      });
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
      this.uploadForm.value.file
    );



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


  plotHighlight(coords: HighlightCoord[]){

    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext("2d");
    for (let line of coords){
      ctx.beginPath();
      ctx.moveTo(line.initX,line.initY);
      ctx.lineTo(line.finalX, line.initY);
      ctx.strokeStyle = environment.strokeStyle;
      ctx.globalAlpha = environment.globalAlpha;
      ctx.lineWidth = environment.lineWidth;
      ctx.stroke();
    }
  }



  onPageRendered(event: CustomEvent){
    //this.saveCleanCanvas();
  }



  private updateDocIdAndPage(docId:string, page:number){
    this.comm.docIdAndPageUpdated.next({
      documentId: docId,
      page: page
    });
  }

  private saveCleanCanvas() {
    return new Promise((resolve, reject) => {
      const canvas = document.getElementsByTagName("canvas")[0];
      const ctx = canvas.getContext("2d");

      this.cleanCanvas =
      ctx.getImageData(0, 0, canvas.width, canvas.height);

      resolve(true);
    });
  }

  //page control
  private clearHighlight() {
    //return a promise
    return new Promise((resolve, reject)=>{

      const destCanv = document.getElementsByTagName("canvas")[0];
      const ctx = destCanv.getContext("2d");

      ctx.putImageData(this.cleanCanvas, 0, 0);

      this.highlightDisplayed = false;

      resolve(true);
    });
  }

  private safeUpdatePage(increment: number){

    if(this.highlightDisplayed || this.inHighlightMode){
      this.clearHighlight().then(
        result => {
          this.page = this.page + increment;

          this.comm.docIdAndPageUpdated.next({
            documentId: this.documentId,
            page: this.page
          });

          this.highlightDisplayed = false;
          this.inHighlightMode = false;
        }
      )
    }else{
      this.page = this.page + increment;

      this.comm.docIdAndPageUpdated.next({
        documentId: this.documentId,
        page: this.page
      });
    }
  }



  toPreviousPage(){
    if(this.page > 1){
      this.comm.highlightsCoord = [];

      this.safeUpdatePage(-1);
    }
  }

  toNextPage(){
    if(this.page < this.maxPage){
      this.comm.highlightsCoord = [];
      this.safeUpdatePage(+1);
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
        this.safeUpdatePage(1 - this.page);

      } else if(navPage > this.maxPage){
        this.safeUpdatePage(this.maxPage - this.page)

      } else{
        this.safeUpdatePage(navPage - this.page)
      }

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

    this.comm.docIdAndPageUpdated.next({
      documentId: doc._id,
      page: 1
    });


  }
}


@Component({
  templateUrl: 'document-alert-bottom-sheet.html'
})
export class DocumentAlertBottomSheet {

  public action: string;
  public alertMessage : string;
  public docInfo:Document;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<DocumentAlertBottomSheet>,
    private comm: CommunicationService
  ){}

  ngOnInit(){
    this.action = this.data.action;
    this.alertMessage = this.data.alertMessage;
    this.docInfo = this.data.docInfo;
  }


  openDoc(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();

    this.comm.docIdAndPageUpdated.next({
      documentId: this.docInfo._id,
      page: 1
    });
  }

}
