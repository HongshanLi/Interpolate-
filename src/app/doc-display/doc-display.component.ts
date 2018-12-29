// open and render the file

import { Component, OnInit, OnChanges, SimpleChanges, Input,
  OnDestroy, Output, ViewChild, ElementRef,
EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Subscription } from "rxjs";
import { PDFDocumentProxy } from 'pdfjs-dist';

import { environment } from "@env/environment";
import { EntityDocumentsService } from
"@app/entity-documents/entity-documents.service";

import { Document } from "@app/models/document.model";

import { MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import{ Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { PageEvent, MatTabChangeEvent } from '@angular/material';

import { AnnotationsService } from
"@app/annotations/annotations.service"

import { AnnotationsComponent } from
"@app/annotations/annotations.component"

@Component({
  selector: 'app-doc-display',
  templateUrl: './doc-display.component.html',
  styleUrls: ['./doc-display.component.css']
})
export class DocDisplayComponent implements OnInit {
  @ViewChild('pdfViewer')
  private pdfViewer;

  @ViewChild('iframe') iframe: ElementRef;

  @Input() documentId: string = null;
  @Input() documentUrl:string = null;
  @Input() documentTitle: string = null;
  @Input() mode: string = "viewDoc";
  @Input() annotatedPage:number = 1;

  private sub: Subscription;

  constructor(
    private docsService: EntityDocumentsService,
    private annotationsService: AnnotationsService,
  ) { }

  ngOnChanges(changes: SimpleChanges){
    if(this.mode=="viewDoc"){
      this._loadPdf();
    }
  }

  ngOnInit() {
    if(this.mode=="viewAnns"){
      console.log("Annotation mode", this.annotatedPage)
    }
  }

  ngAfterViewInit(){
    /*
    if(this.mode=="viewDoc"){
      //this._loadPdf();
      //this.iframe.nativeElement.style.width = "100%";
      this._loadPdf();
    }
    */
  }


  private _loadPdf(){
    if(this.iframe){

      let viewerUrl = `/assets/pdfjs/web/viewer.html?file=${this.documentUrl}`
      this.iframe.nativeElement.src = viewerUrl;
      return;
    }else{
      setTimeout(()=>{
        this._loadPdf()
      }, 200)
    }
  }


  displayFullDoc(event: Event){
    this.mode = "viewDoc";
    this._loadPdf();
  }

  viewAnns(){
    //@Todo set annoated page as current page
    this.annotatedPage = 1;
    this.mode = "viewAnns";
    this.annotatedPage = +localStorage.getItem("currentPage");
  }

  ngOnDestroy(){
    localStorage.removeItem("currentPage");
  }

}


/*
@Component({
  templateUrl: 'docs-in-entity-bottom-sheet.html',
})
export class DocsInEntityBottomSheet {
  public docsInEntity: Document[] = [];
  public docsToDisplay: Document[] = [];


  private entityType:string;
  private entityName: string;
  private entityId:string;

  private currentPageIndex = 0;
  //public pageSizeOptions = [2,4,10,15,20];
  public pageSize = 10;
  public totalDocsCount: number;

  public keywords:string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private comm: CommunicationService,
    private bottomSheetRef: MatBottomSheetRef<DocsInEntityBottomSheet>) {}

  ngOnInit(){
    this.docsInEntity = this.data.docsInEntity;
    this.docsToDisplay = this.docsInEntity.slice(0, this.pageSize);
    this.totalDocsCount = this.docsInEntity.length;
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

  onChangePagination(pageData: PageEvent){
    this.currentPageIndex = pageData.pageIndex;

    this.docsToDisplay = this.docsInEntity.slice(
      this.currentPageIndex,
      this.currentPageIndex + this.pageSize);
  }


  searchDoc(event: Event){
    const keywords = (<HTMLInputElement>event.target).value;

    if(keywords!=""){
      const keywordsList = keywords.split(" ")

      let docsToDisplay = [];
      let cp = [...this.docsInEntity];

      for (let keyword of keywordsList){
        for(let i = 0; i < cp.length; i++){
          if(cp[i].title.toLowerCase().includes(keyword)){
            docsToDisplay.push(cp[i]);
            cp.splice(i, 1);
          }
        }
      }

      this.docsToDisplay = docsToDisplay;
    }else{

      this.docsToDisplay = this.docsInEntity.slice(
        this.currentPageIndex,
        this.currentPageIndex + this.pageSize);
    }
  }
}



@Component({
  templateUrl: 'document-alert-bottom-sheet.html',
  styleUrls: ['./document-alert-bottom-sheet.css']
})
export class DocumentAlertBottomSheet {

  public updateForm : FormGroup;

  public action: string;
  public alertMessage : string;
  public docInfo:Document;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<DocumentAlertBottomSheet>,
    private comm: CommunicationService,
    private docsService: EntityDocumentsService,
  ){}

  ngOnInit(){
    this.action = this.data.action;
    this.alertMessage = this.data.alertMessage;
    this.docInfo = this.data.docInfo;

    if(this.action==='update'){

      this.updateForm = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required]
        }),
        authors: new FormControl(null,
          { validators: [] }),
      });

      this.updateForm.setValue({
        title: this.docInfo.title,
        authors: this.docInfo.authors
      })

    }


  }


  openDoc(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();

    this.comm.docIdAndPageUpdated.next({
      documentId: this.docInfo._id,
      page: 1,
    });
  }

  saveUpdate(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();

    this.docInfo.title = this.updateForm.value.title;
    this.docInfo.authors = this.updateForm.value.authors;

    this.docsService.updateDoc(this.docInfo, this.data.index);
    this.updateForm.reset();

  }

}
*/
