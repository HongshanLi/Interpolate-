import { Component, OnInit, OnChanges,
  SimpleChanges, Input } from '@angular/core';

import { PageEvent } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Annotation } from "@app/models/annotation.model";
import { HighlightCoord } from "@app/models/highlightCoord";
import { AnnotationsService } from "./annotations.service";
import { Subscription } from "rxjs";
import { CommunicationService } from "@app/communication.service";
import { environment } from "@env/environment";

interface Query {
  entityType:string,
  entityId:string,
  pageSize:number,
  currentPage: number,
  filterOptions?: string,
}

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {
  // ownership
  public userName:string;

  //document page
  public page: number;


  private entityType:string;
  private documentId: string;
  private entityId:string;
  public entity:string;

  private getQuery: Query;

  public annCreate: FormGroup;
  public annUpdate: FormGroup;


  private sub : Subscription;

  // all annotations in the entity or document
  // from the service
  public annList : Annotation[]=[]
  public branch: Annotation[] = [];
  public selectedIndex:number;

  // pagination
  public totalAnns: number;
  public pageSize = 10;
  public currentPage = 1;


  // create ann
  public showAnnCreateForm:boolean = false;
  public inHighlightMode:boolean = false;
  public mode:string = "create";

  public showAnnUpdateForm: boolean = false;

  // filter and search
  public message:string;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: AnnotationsService,
    private comm: CommunicationService
  ) { }

  ngOnChanges(changes: SimpleChanges){
  }

  ngOnInit() {

    this.userName = localStorage.getItem("userName");

    if(this.entityType=="classes"){
      this.entity = "class"
    }

    if(this.entityType=="groups"){
      this.entity = "group"
    }

    if(this.entityType=="my-library"){
      this.entity = "library"
    }

    this.annCreate = new FormGroup({

      title: new FormControl(null),

      content: new FormControl(null,
      {
        validators: [Validators.required]
      }),
      parent: new FormControl(null),
    });

    this.annUpdate = new FormGroup({
      _id: new FormControl(null, {
        validators: [Validators.required]
      }),

      title: new FormControl(null, {
        validators: []
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),

      highlightsCoord: new FormControl(null),

      parent: new FormControl(null),

      children: new FormControl(null),

      creatorName: new FormControl(null,
      {
        validators: [Validators.required]
      }),

      annListIdx: new FormControl(null,
      {
        validators: [Validators.required]
      }),

      branchIdx: new FormControl(null,
      {
        validators: [Validators.required]
      }),
    });




    // Get all rootAnn in document or entire entity
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.entityType = paramMap.get("entityType");
        this.entityId = paramMap.get("entityId");

        if(this.entityType == null){
          this.entityType = "my-library"
        }

        this.getQuery = {
          entityType: this.entityType,
          entityId: this.entityId,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          filterOptions: "undefined",
        }

        //initial get
        this.mainService.getAnnotations(this.getQuery);
      }
    );



    this.sub = this.comm.docIdAndPageUpdated.subscribe(
      res => {
        this.documentId = res.documentId;
        this.page = res.page;
      }
    );


    this.sub = this.mainService.annListUpdated
    .subscribe(
      res => {
        this.annList = res.annotations;
        this.totalAnns = res.totalAnns
      }
    );

    this.sub = this.mainService.branchUpdated
    .subscribe(
      res => {
        this.branch = res;

        this.updateDocIdAndPage(this.branch[0]);

      }
    )
  }

  private updateDocIdAndPage(annotation: Annotation){

    this.documentId = annotation.documentId
    this.page = annotation.page;


    this.comm.docIdAndPageUpdated.next({
      documentId: this.documentId,
      page: this.page
    });
  }

  // pagination

  onChangePagination(pageData: PageEvent){

    this.pageSize = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.getQuery.pageSize = this.pageSize;
    this.getQuery.currentPage = this.currentPage;

    this.mainService.getAnnotations(this.getQuery)

  }


  startNewThread(){
    this.mode="create"
    this.showAnnCreateForm = true;
    this.clearHighlight();
  }

  createAnn(){
    if(this.annCreate.invalid){
      return;
    }

    const annotation : Annotation = {
      _id: null,
      entityType: this.entityType,
      entityId: this.entityId,
      documentId: this.documentId,
      creatorId: null,
      creatorName: this.userName,
      title: this.annCreate.value.title,
      content: this.annCreate.value.content,
      page: this.page,
      highlightsCoord: this.comm.highlightsCoord,
      createTime:Date.now(),
      lastEditTime: null,
      followedBy: [],
      viewedBy:[],
      parent: this.annCreate.value.parent?
        this.annCreate.value.parent : "root",
      children: []
    }

    this.mainService.createAnnotation(annotation);

    if(annotation._id!=null){

    }else{

    }

    this.annCreate.reset();
    this.comm.highlightsCoord = [];
    this.inHighlightMode = false;
    this.comm.inHighlightMode.next(this.inHighlightMode);
    this.showAnnCreateForm=false;
  }


  updateAnn(){
    if(this.annUpdate.invalid){
      return;
    }

    const annotation : Annotation = {
      _id: this.annUpdate.value._id,
      entityType: this.entityType,
      entityId: this.entityId,
      documentId: this.documentId,
      creatorId: null,
      creatorName: this.annUpdate.value.creatorName,
      title: this.annUpdate.value.title,
      content: this.annUpdate.value.content,
      page: this.page,
      highlightsCoord: this.annUpdate.value.highlightsCoord,
      createTime:Date.now(),
      lastEditTime: null,
      followedBy: [],
      viewedBy:[],
      parent: this.annUpdate.value.parent?
        this.annUpdate.value.parent : "root",
      children: this.annUpdate.value.children,
    }

    this.mainService.updateAnnotation(
      annotation,
      this.annUpdate.value.annListIdx,
      this.annUpdate.value.branchIdx
    );

    this.annUpdate.reset();
    this.comm.highlightsCoord = [];
    this.inHighlightMode = false;
    this.comm.inHighlightMode.next(this.inHighlightMode);
    this.showAnnUpdateForm=false;

  }

  addHighlight(event: Event){

    this.inHighlightMode = !this.inHighlightMode;
    this.comm.inHighlightMode.next(this.inHighlightMode);

    const button = document.getElementById("highlight");

    if(this.inHighlightMode){
      button.style.background = "#00b8e6";
    }else {
      button.style.background = "white";
    }

  }


  discard(){
    this.showAnnCreateForm = false;
    this.annCreate.reset();

    this.showAnnUpdateForm = false;
    this.annUpdate.reset();

    this.comm.clearHighlight.next(true);
  }

  viewChildren(annotation: Annotation){

    this.mainService.setBranch(annotation);

    this.selectedIndex = 2
    this.comm.clearHighlight.next(true);

  }

  viewParent(annotation: Annotation){
    const parentAnn = this.annList[
      this.getParentIndex(annotation)
    ]

    this.mainService.setBranch(parentAnn)

    this.comm.clearHighlight.next(true);
  }


  timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  reply(annotation:Annotation){
    this.mode = "reply";

    this.updateDocIdAndPage(annotation);

    this.annCreate.patchValue({
      parent: annotation._id
    })

    // set current ann to node of a branch
    this.mainService.setBranch(annotation);

    this.showAnnCreateForm = true;
    this.comm.clearHighlight.next(true);
  }

  edit(annotation: Annotation){
    // show the highlight of the current annotation
    this.updateDocIdAndPage(annotation);

    this.mode = "edit";

    this.annUpdate.setValue({
      _id: annotation._id,
      title: annotation.title,
      content: annotation.content,
      highlightsCoord: annotation.highlightsCoord,
      parent: annotation.parent,
      children: annotation.children,
      creatorName: annotation.creatorName,
      annListIdx: this.annList.indexOf(annotation),
      branchIdx: this.branch.indexOf(annotation),
    });

    this.showAnnUpdateForm = true;

  }


  showHighlight(annotation: Annotation){

    this.updateDocIdAndPage(annotation);

    this.comm.clearHighlight.next(true);

    this.comm.showHighlight.next({
      page: this.page,
      coords: annotation.highlightsCoord});

  }

  clearHighlight(){
    this.comm.clearHighlight.next(true)
  }

  delete(annotation: Annotation){

    this.mainService.deleteAnnotation(
      annotation,
      this.getParentIndex(annotation)
    );

    if(annotation.highlightsCoord.length > 0){
      this.comm.clearHighlight.next(true);
    }
  }

  private getParentIndex(annotation: Annotation){
    if(annotation.parent == "root"){
      return -1;
    }else{
      for(let ann of this.annList){
        if(ann._id == annotation.parent){
          return this.annList.indexOf(ann);
          break;
        }
      }
    }
  }

  //filter
  filter(event: Event){
    const optionList = [
      "documentId", "creatorName", "editorName", "page",
      "createBefore", "createAfter"
    ];

    const LongOptions = [
      "--all"
    ];

    const command = (<HTMLInputElement>event.target).value;

    const arg = command.split(" ")[0];
    console.log(command.split(" "))

    //emty command = display all
    if(command==""){
      this.mainService.getAnnotations(this.getQuery)
    }

    // check command has the correct options
    let re = /(?:^|\W)-(\w+)(?!\w)/g, match, matches = [];

    command.split(" ").forEach(
      s => {
        while(match = re.exec(s)){
          matches.push(match[1]);
        }
      }
    );

    let invalidOptions = []
    matches.forEach(option => {
      if(optionList.indexOf(option)==-1){
        invalidOptions.push(option);
      }
    });

    if(invalidOptions.length==0){
      this.getQuery.filterOptions = command;


      //this.mainService.getAnnotations(this.getQuery);
      this.message = "";
      return;
    }else{
      this.message = invalidOptions[0] + " is not a valid option"
    }

  }


}
