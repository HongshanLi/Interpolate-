//dispaly the detail info of a group and class

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";

import { AuthService } from "@app/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "@env/environment";
import { MatTabChangeEvent } from "@angular/material";
import { EntitiesService } from "@app/entities/entities.service"
import { Subscription } from "rxjs"
import { EntityDocumentsService } from
"@app/entity-documents/entity-documents.service";
import { Document } from "@app/models/document.model";
import { Annotation } from "@app/models/annotation.model";
import { mimeType } from "@app/helpers/mime-type.validator";
import { CommunicationService } from "@app/communication.service";
import { AnnotationsService } from "@app/annotations/annotations.service";
import { DocDisplayComponent } from "@app/doc-display/doc-display.component";


import { MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import{ Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';


interface ActivatedDoc {
  title: string,
  documentId: string,
  documentUrl: string,
}

interface Query {
  documentId:string,
  page: number,
}

interface Filter {
  creatorName: string,
  editorName: string,
  documentId: string,
  page: number,
  parent: string,
};

interface QueryObject {
  keywords: string,
  entityType: string,
  entityId:string,
  filter: Filter,
}

@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnInit {
  @ViewChild('docDisplay') docDisplay: DocDisplayComponent;


  public entityType:string;
  public entity:string;
  public entityName: string;
  public entityId: string;

  private entityData: any;

  public entityUpdate: FormGroup;
  public updatingEntityInfo: boolean = false;

  public uploadForm : FormGroup;
  public docsInEntity: Document[]=[];
  public docsToDisplay: Document[]=[];

  public activatedDocs: ActivatedDoc[] = [];

  public activeDocTitle: string;
  public activeDocId:string;
  public activeDocUrl:string;
  public docDisplayMode:string = "viewDoc";

  public annList : Annotation[]=[];
  public annotatedPage: number;
  public nodeAnnotationId: string;

  public fileTypeValid = false;
  public joinLink: string;
  private sub: Subscription;

  public userCanUpload:boolean = true;
  public userName:string;


  public panel:string = "entityInfo";
  public message:string;
  public searchPlaced: boolean = false;
  public sideNavOpened:boolean = true;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private mainService: EntitiesService,
    private docsService: EntityDocumentsService,
    private annotationsService: AnnotationsService,
    private comm: CommunicationService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {

    this.entityUpdate = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null,
        { validators: [] }),
    });

    this.uploadForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),

      authors: new FormControl(null,
        { validators: [] }),

      file: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: []
      })
    });



    this.route.paramMap.subscribe(
      (paramMap: ParamMap)=>{

        this.entityName = paramMap.get("entityName");
        this.entityType = paramMap.get("entityType");
        this.entityId = paramMap.get("entityId");

        if(this.entityType==null){
          this.entityType = "my-library";
          this.entityName = "My Library";
        }

        if(this.entityType=="classes"){
          this.entity = "class"
        }

        if(this.entityType=="groups"){
          this.entity = "group"
        }

        if(this.entityType!="my-library"){

          this.mainService.getEntityInfo(
            this.entityType,
            this.entityId
          )
        }



        this.joinLink = environment.frontEndUrl + "/entity/join/" + this.entityType  +
        "/" + this.entityName + "/" + this.entityId
      }
    );

    this.sub = this.mainService.selectedEntityUpdated.subscribe(
      res => {
        this.entityData = res;

        if(this.entityType=="classes" && this.entityData.userIsCreator === false){
          this.userCanUpload = false
        }

      }
    );


    this.sub= this.docsService.docsUpdatedObs()
    .subscribe(
      res => {
        this.docsInEntity = res;
      }
    );

    this.sub = this.docsService.closeDoc.subscribe(
      documentId => {

        this.activatedDocs = this.activatedDocs.filter(
          item => item.documentId != documentId
        );

        this.panel = "documents";
      }
    )


    this.sub = this.annotationsService.annListUpdated
    .subscribe(
      res => {
        this.annList = res.annotations;
        //this.getMethod = res.getMethod;
      }
    );

    this.sub = this.docsService.docInfoUpdated.subscribe(
      res => {
        this.activatedDocs.forEach(doc => {
          if(doc.documentId === res.documentId){
            const idx = this.activatedDocs.indexOf(doc);
            doc.title = res.documentTitle;
            this.activatedDocs[idx] = doc
          }
        });

        this.activeDocTitle = res.documentTitle
      }
    )
  }

  changeSideNav(event: string){
    console.log(event);


    if(event==="viewAnns"){
      this.sideNavOpened = false;
    }

    if(event==="viewDoc"){
      this.sideNavOpened = true;
    }

  }

  showEntityInfo(){
    this.panel = "entityInfo";
    this.searchPlaced = false;
  }

  showUpdateEntityForm(){
    this.entityUpdate.setValue({
      name: this.entityData.name,
      description: this.entityData.description? this.entityData.description: null,
    });
    this.updatingEntityInfo = true;
  }

  updateEntity(){
    const entity = {
      _id: this.entityData._id,
      name: this.entityUpdate.value.name,
      description: this.entityUpdate.value.description
    }

    this.mainService.updateEntity(this.entityType, entity).subscribe(
      res => {
        this.updatingEntityInfo = false;
        this.entityData.name = entity.name;
        this.entityName = entity.name;
        this.entityData.description = entity.description;

        this.joinLink = environment.frontEndUrl + "/entity/join/" + this.entityType  +
        "/" + this.entityName + "/" + this.entityId;

        //this.location.go("/entity/"+this.entityType+"/"+this.entityName+"/"+this.entityId);
        this.router.navigate(["entity", this.entityType, this.entityName, this.entityId])
      }
    )
  }


  discardEntityUpdate(){
    this.entityUpdate.reset();
    this.updatingEntityInfo = false;
  }

  showDocuments(){
    this.docsService.getEntityDocuments(
      this.entityType, this.entityId
    );

    this.panel = "documents";
    this.searchPlaced = false;
  }

  showAnnotations(){
    this.panel = "annotations";
    this.searchPlaced = false;
    // get root annotation of the entity by default
    const filter = {
      creatorName: null,
      editorName:null,
      documentId: null,
      page: null,
      parent: "root"
    }

    const queryObject = {
      keywords : "*",
      entityType: this.entityType,
      entityId: this.entityId,
      filter: filter
    }


    this.annotationsService.searchAnnotations(queryObject);
  }

  showAnnsSearchTips(){
    this.bottomSheet.open(AnnotationsSearchTipsBottomSheet);
  }


  search(event: Event){
    const query = (<HTMLInputElement>event.target).value.trim();

    if(query==""){
      this.searchPlaced = false;
      return;
    }

    this.searchPlaced = true;

    let filterStr:string;
    let queryObject : QueryObject;

    if(query.indexOf("|") > -1){
      // if there is a pipeline, then get keywords as
      // everything before the pipeline
      const keywords = query.substr(0, query.indexOf("|")).trim();

      if(keywords === "*"){
        //this.keywordsStr = "";
      }else{
        //this.keywordsStr = keywords;
      }

      filterStr = query.substr(query.indexOf("|")+1).trim();

      let filter = this.filterParse(filterStr);

      if(filter != false){
        filter = filter as Filter;

        queryObject = {
          keywords: keywords,
          entityType: this.entityType,
          entityId: this.entityId,
          filter: filter
        }

      }else{
        //this.keywordsStr = "";
        // invalid filter options
        // display error message to users
        return;
      }
    }else{
      // keywords only, no filter options

      if(query === "*"){
        //this.keywordsStr = "";
      }else{
        //this.keywordsStr = query;
      }

      queryObject = {
        keywords: query,
        entityType: this.entityType,
        entityId: this.entityId,
        filter : {
          creatorName: null,
          editorName: null,
          documentId: null,
          page: null,
          parent: null,
        }
      }
    }

    this.annotationsService.searchAnnotations(queryObject);
  }


    private filterParse (filterStr: string): boolean | Filter {
      // return a javascript object
      // get valid options
      const optionList = [
        "--creator-name", "--editor-name",
        "--root-only", // by default, all annotations
      ]

      // check if filterStr has any invalid options
      let possibleOptions = [];
      for (let s of filterStr.split(" ")){
        if(s.startsWith("--")){
          possibleOptions.push(s);
        }
      }

      let invalidOptions = [];
      for (let op of possibleOptions){
        if(optionList.indexOf(op) == -1){
          invalidOptions.push(op)
        }
      }

      if(invalidOptions.length > 0){
        this.message = invalidOptions[0] + " is an invalid option.";
        return false;

      }else {

        let filter : Filter = {
          creatorName: null,
          editorName: null,
          parent:null,
          documentId: null,
          page: null,
        };

        for(let op of possibleOptions){
          if(op=="--creator-name"){
            if(this.valueOf(filterStr, op)!= false){
              filter["creatorName"] = this.valueOf(filterStr, op) as string;
            }else{
              this.message = "Please supply a valid value for creatorName";
              return;
            }
          }

          if(op=="--editor-name"){
            if(this.valueOf(filterStr, op) != false){
              filter["editorName"] = this.valueOf(filterStr, op) as string;
            }else{
              this.message = "Please supply a valid value for editorName";
              return;
            }

          }

          if(op=="--root-only"){
            filter["parent"] = "root"
          }
        }

        this.message = "";
        return filter;

      }

    }

    private valueOf(filterStr:string, option:string): boolean | string {
      const list = filterStr.split(" ");
      const valueIdx = list.indexOf(option) + 1;
      if(list[valueIdx].startsWith("--")){
        return false;
      }else{
        return list[valueIdx]
      }
    }


  displayInContext(ann: Annotation){

    let docIdx : number = -1;
    for (let doc of this.activatedDocs){
      if(doc.documentId == ann.documentId){
        docIdx = this.activatedDocs.indexOf(doc);
        break;
      }
    }

    this.annotatedPage = ann.page;
    this.nodeAnnotationId = ann._id;

    this.docDisplayMode = "viewAnns";

    if(docIdx !==-1){
      this.openDoc(this.activatedDocs[docIdx]);
    }else{
      this.docsService.getDocById(ann.documentId).subscribe(
        arrayBuffer => {
          const blob = new Blob([arrayBuffer], {type: "application/pdf"});
          const docUrl = URL.createObjectURL(blob);

          const activatedDoc = {
            title: ann.docTitle,
            documentId: ann.documentId,
            documentUrl: docUrl,
          }

          this.activatedDocs.push(activatedDoc);
          //localStorage.setItem("initialDisplayedPage", ann.page)
          this.openDoc(activatedDoc);
        }
      );
    }

    this.sideNavOpened = false;
  }

  displayDoc(activatedDoc){
    this.docDisplayMode = "viewDoc";
    this.annotatedPage = null;
    this.openDoc(activatedDoc);
  }




// documents
  getFile(doc: Document ){

    let docIdx : number = -1;
    for (let activatedDoc of this.activatedDocs){
      if(activatedDoc.documentId === doc._id){
        docIdx = this.activatedDocs.indexOf(activatedDoc);
        break;
      }
    }

    if(docIdx!==-1){
      this.openDoc(this.activatedDocs[docIdx])


    }else{
      this.docsService.getDocById(doc._id).subscribe(
        arrayBuffer => {
          const blob = new Blob([arrayBuffer], {type: "application/pdf"});
          const docUrl = URL.createObjectURL(blob);

          const activatedDoc = {
            title: doc.title,
            documentId: doc._id,
            documentUrl: docUrl,
          }

          this.activatedDocs.push(activatedDoc);

          this.openDoc(activatedDoc);
        }
      );
    }
  }

  openDoc(activatedDoc:ActivatedDoc){

    this.activeDocTitle = activatedDoc.title;
    this.activeDocId = activatedDoc.documentId;
    this.activeDocUrl = activatedDoc.documentUrl;

    this.panel = "displayDocument";
  }

  closeDoc(activatedDoc: ActivatedDoc){
    this.activatedDocs = this.activatedDocs.filter(
      item => item.documentId != activatedDoc.documentId
    );

    this.panel = "documents";

  }


  // upload
  onFileSelected(event: Event){

    const file = (event.target as HTMLInputElement).files[0];

    // verify mimetype
    if(mimeType(file)){
      this.fileTypeValid = true;

      this.uploadForm.patchValue({
        file: file,
        title: file.name
       });

      this.uploadForm.get("file").updateValueAndValidity();

      this.uploadFile();

    }else{
      this.fileTypeValid = false;

      /*
      this.bottomSheet.open(DocumentAlertBottomSheet, {
        data: {
          alertMessage: "We only support PDF document for now!"
        }
      });
      */
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


  searchDoc(event: Event){
    const keywords = (<HTMLInputElement>event.target).value;

    if(keywords!=""){
      this.searchPlaced = true;

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
      this.searchPlaced = false;

    }
  }


  ngOnDestroy(){
  }
    //this.sub.unsubscribe();

}


@Component({
  //selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'annotations-search-tips-bottom-sheet.html',
})
export class AnnotationsSearchTipsBottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<AnnotationsSearchTipsBottomSheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
