import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Document } from "@app/models/document.model";
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { EntityDocumentsService } from "./entity-documents.service";
import { UpdateBottomSheetComponent } from
"@app/update-bottom-sheet/update-bottom-sheet.component";

import { Router, ActivatedRoute } from "@angular/router";

import{ Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-entity-documents',
  templateUrl: './entity-documents.component.html',
  styleUrls: ['./entity-documents.component.scss']
})
export class EntityDocumentsComponent implements OnInit, OnDestroy {
  @Input('entityType') entityType:string;
  @Input('entityId') entityId: string;
  @Input('entityName') entityName:string;

  public tabIndex : number;

  public docsInLib: Document[]=[];
  public docsInEntity : Document[]=[];

  public docToUpdate:Document;

  private uploadForm: FormGroup;

  private subscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private docsService: EntityDocumentsService,
    private bottomSheet: MatBottomSheet,
  ) {}

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


    this.docsService.getEntityDocuments(
      this.entityType, this.entityId
    );


    this.subscription = this.docsService.docsUpdatedObs()
    .subscribe(
      res => {
        this.docsInEntity = res;

        this.tabIndex = 0;
        this.uploadForm.reset();
      }
    );
  }

  openBottomSheet(): void {
    this.bottomSheet.open(DocsInLibBottomSheet);
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({ file: file });
    this.uploadForm.get("file").updateValueAndValidity();
  }


  uploadFile(){


    let docInfo : Document = {
      _id : null,
      title: this.uploadForm.value.title,
      authors: this.uploadForm.value.authors,
      userId: null,
      entityType: this.entityType,
      entityId: this.entityId,
      uploadTime: Date.now(),
      threadsCount : 0,
      fileType: this.uploadForm.value.file.type,
    }



    this.docsService.saveDocInfo(
      docInfo,
      this.uploadForm.value.file);


  }

  updateDoc(docInfo: Document){
    this.bottomSheet.open(DocsInLibBottomSheet, {
      data: {
        docInfo: docInfo,
        index: this.docsInEntity.indexOf(docInfo)
    }});
  }

  deleteDoc(docInfo: Document){
   this.docsService.deleteDoc(docInfo);
  }

  timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  openDoc(doc: Document){
    this.router.navigate([doc._id], {relativeTo: this.route});
  }

  ngOnDestroy(){
    // cannot unsubscribe here;
    // maybe I need to move the update sheet to a different
    // component;
  }
}



@Component({
  templateUrl: 'docs-in-lib-bottom-sheet.html',
  providers:[EntityDocumentsComponent]
})
export class DocsInLibBottomSheet {

  public updateForm: FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private entityDocs: EntityDocumentsComponent,
    private docsService: EntityDocumentsService,
    private bottomSheetRef: MatBottomSheetRef<DocsInLibBottomSheet>) {}

  ngOnInit(){

    this.updateForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      authors: new FormControl(null, { validators: [Validators.required] })
    });

    this.updateForm.setValue({
      title: this.data.docInfo.title,
      authors: this.data.docInfo.authors
    });

  }

  saveUpdate(event: MouseEvent): void {
    const oldDoc = this.data.docInfo;

    const updatedDoc : Document = {
      _id: oldDoc._id,
      title:this.updateForm.value.title,
      authors: this.updateForm.value.authors,
      userId:oldDoc.userId,
      entityType:oldDoc.entityType,
      entityId:oldDoc.entityId,
      uploadTime:oldDoc.uploadTime,
      threadsCount:oldDoc.threadsCount,
      fileType: oldDoc.fileType,
    }

    this.docsService.updateDoc(updatedDoc, this.data.index);

    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnDestroy(){
  }
}
