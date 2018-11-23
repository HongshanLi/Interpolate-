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
  private getQuery: Query;

  public annCreate: FormGroup;


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

    this.annCreate = new FormGroup({

      title: new FormControl(null, {
        validators: []
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      parent: new FormControl(null),

      // For update
      _id: new FormControl(null),
      isOwner: new FormControl(null),
      annListIdx: new FormControl(null),
      branchIdx: new FormControl(null)
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

    this.sub = this.comm.documentIdUpdated.subscribe(
      res => {
        this.documentId = res
      }
    );

    this.sub = this.comm.pageUpdated.subscribe(
      res => {
        this.page = res;
      }
    )

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
      }
    )
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
      _id: this.annCreate.value._id?
        this.annCreate.value._id : null,

      entityType: this.entityType,
      entityId: this.entityId,
      documentId: this.documentId,
      creatorId: null,
      creatorName: this.annCreate.value.creatorName?
        this.annCreate.value.creatorName: null;

      title: this.annCreate.value.title,
      content: this.annCreate.value.content,
      page: this.page,
      highlightsCoord: this.comm.highlightsCoord,
      createTime:Date.now(),
      lastEditTime: this.annCreate.value._id?
        Date.now() : null,
      followedBy: [],
      viewedBy:[],
      parent: this.annCreate.value.parent?
        this.annCreate.value.parent : "root",
      children: []
    }

    if(annotation._id!=null){
      this.mainService.updateAnnotation(
        annotation,
        this.annCreate.value.annListIdx,
        this.annCreate.value.branchIdx
      );
    }else{
      this.mainService.createAnnotation(annotation);
    }

    this.annCreate.reset();
    this.comm.highlightsCoord = [];
    this.inHighlightMode = false;
    this.comm.inHighlightMode.next(this.inHighlightMode);
    this.showAnnCreateForm=false;
  }


  update

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
    this.comm.clearHighlight.next(true);
  }

  viewChildren(annotation: Annotation){
    this.page = annotation.page;
    if(this.documentId!=annotation.documentId){
      this.documentId = annotation.documentId;
      this.comm.documentIdUpdated.next(this.documentId)
    }

    this.comm.pageUpdated.next(this.page);
    this.mainService.setBranch(annotation);
    this.selectedIndex = 2
    this.comm.clearHighlight.next(true);

  }

  viewParent(annotation: Annotation){
    const parentAnn = this.annList[
      this.getParentIndex(annotation)
    ]

    if(this.documentId != parentAnn.documentId){

      this.documentId = annotation.documentId
      this.comm.documentIdUpdated.next(
        this.documentId);
    }


    this.page = parentAnn.page;
    this.comm.pageUpdated.next(this.page);

    this.mainService.setBranch(parentAnn)
    this.comm.clearHighlight.next(true);
  }


  timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  reply(annotation:Annotation){
    this.mode = "reply";
    this.annCreate.patchValue({
      parent: annotation._id
    })

    this.showAnnCreateForm = true;
    this.comm.clearHighlight.next(true);
  }

  edit(annotation: Annotation){
    // show the highlight of the current annotation
    this.page = annotation.page;
    this.comm.showHighlight.next({
      page: this.page,
      coords: annotation.highlightsCoord
    })

    this.mode = "edit";

    this.annCreate.setValue({
      _id: annotation._id,
      title: annotation.title,
      content: annotation.content,
      parent: annotation.parent,
      isOwner: annotation.creatorName == localStorage.getItem("userName")?
      true: false;

      annListIdx: this.annList.indexOf(annotation),
      branchIdx: this.branch.indexOf(annotation),
    });

    this.showAnnCreateForm = true;

  }


  showHighlight(annotation: Annotation){
    this.page = annotation.page;

    if(this.documentId != annotation.documentId){
      this.documentId = annotation.documentId
      this.comm.documentIdUpdated.next(
        this.documentId
      );
    }


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
