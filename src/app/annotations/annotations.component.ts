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
import { MatTabChangeEvent } from "@angular/material";


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

interface SearchQuery {
  keywords: string,
  entityType: string,
  entityId:string,
  filter: Filter,
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
  public documentId: string;

  private entityId:string;
  public entity:string;

  private getQuery: Query;

  public annCreate: FormGroup;
  public annUpdate: FormGroup;


  private sub : Subscription;

  // all annotations in the entity or document
  // from the service
  public annList : Annotation[]=[];
  public getMethod: string = "regular"

  public branch: Annotation[] = [];

  public selectedIndex:number = 0;

  // pagination
  public totalAnns: number;
  public pageSize = 10;
  public currentPage = 1;


  // create ann
  public showAnnCreateForm:boolean = false;
  public inHighlightMode:boolean = false;
  public mode:string = "create";

  public showAnnUpdateForm: boolean = false;

  private highlightDisplayed :boolean = false;

  // filter and search
  public message:string;
  public keywordsStr:string = "";

  // active document


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: AnnotationsService,
    private comm: CommunicationService
  ) { }


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
          this.entityType = "my-library";
          this.entityId = "my-library"
        }

        //initial get
        //this.mainService.getAnnotations(this.getQuery);
      }
    );


    this.sub = this.comm.docIdAndPageUpdated.subscribe(
      res => {
        console.log("docId and page updated", res);
        this.inHighlightMode = false;
        this.highlightDisplayed = false;

        if(this.documentId != res.documentId || this.page != res.page){
          this.documentId = res.documentId;
          this.page = res.page;

          if(this.showAnnCreateForm || this.showAnnUpdateForm){
            this.annCreate.reset();
            this.annUpdate.reset();

            this.comm.highlightsCoord = [];
            this.inHighlightMode = false;

            this.showAnnCreateForm = false;
            this.showAnnUpdateForm = false;
          }


          this.getQuery = {
            documentId: this.documentId,
            page: this.page,
          }

          this.mainService.getAnnotations(this.getQuery);
          //this.branch = []
          this.selectedIndex = 0;
        }
      }
    );


    this.sub = this.mainService.annListUpdated
    .subscribe(
      res => {
        this.annList = res.annotations;
        this.getMethod = res.getMethod;
      }
    );

    this.sub = this.mainService.branchUpdated
    .subscribe(
      res => {
        this.branch = res;

        if(this.branch.length > 0){
          this.updateDocIdAndPage(this.branch[0]);
        }

        this.selectedIndex = 1;
      }
    );

  }

  isNode(ann:Annotation, branch:Annotation[]): boolean {
    if(branch.indexOf(ann) === 0 ){
      return true;
    }else{
      return false
    }
  }


  onSelectedTabChange(event: MatTabChangeEvent){
    //this.selectedIndex = event.index;

    if(event.index == 0 && this.highlightDisplayed){
      this.clearHighlight();
    }

    if(event.index == 0){
      this.getQuery = {
        page : this.page,
        documentId: this.documentId
      }

      this.mainService.getAnnotations(this.getQuery)
    }

    // If back to the root annotation panel
    // clean highlight from the current tree
  }


  private updateDocIdAndPage(node: Annotation){

    if(node.documentId != this.documentId || node.page != this.page){
      this.comm.docIdAndPageUpdated.next({
        documentId: node.documentId,
        page: node.page
      });
    }
  }

  // pagination

  onChangePagination(pageData: PageEvent){

    this.pageSize = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    //this.getQuery.pageSize = this.pageSize;
    //this.getQuery.currentPage = this.currentPage;

    //this.mainService.getAnnotations(this.getQuery)

  }


  startNewThread(){
    this.mode="create"
    this.showAnnCreateForm = true;
    //this.clearHighlight();
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

    this.annCreate.reset();

    if(this.inHighlightMode || this.comm.highlightsCoord.length > 0){
      this.comm.highlightsCoord = [];
      this.inHighlightMode = false;
      this.comm.inHighlightMode.next(false);
      this.clearHighlight();
    }

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

    if(this.inHighlightMode){
      this.clearHighlight();
      this.inHighlightMode = false;
      this.comm.inHighlightMode.next(false);
    }
  }

  viewChildren(annotation: Annotation){
    this.mainService.setBranch(annotation._id);
    //this.comm.clearHighlight.next(true);
  }

  viewParent(annotation: Annotation){

    this.mainService.setBranch(annotation.parent);
    //this.comm.clearHighlight.next(true);
  }


  timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  reply(annotation:Annotation){
    this.mode = "reply";

    //this.updateDocIdAndPage(annotation);

    this.annCreate.patchValue({
      parent: annotation._id
    })

    // set current ann to node of a branch
    //this.mainService.setBranch(annotation);
    this.showAnnCreateForm = true;

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
    this.highlightDisplayed = true;

    this.comm.showHighlight.next({
      documentId: annotation.documentId,
      page: annotation.page,
      coords: annotation.highlightsCoord
    });
  }

  clearHighlight(){
    this.comm.clearHighlight.next(true);
    this.highlightDisplayed = false;
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
  search(event: Event){

    const query = (<HTMLInputElement>event.target).value.trim();


    if(query==""){
      this.getQuery = {
        documentId: this.documentId,
        page: this.page,
      }

      this.keywordsStr = "";

      this.mainService.getAnnotations(this.getQuery);
      return;
    }

    let filterStr:string;


    let queryObject : SearchQuery;

    if(query.indexOf("|") > -1){
      // if there is a pipeline, then get keywords as
      // everything before the pipeline

      const keywords = query.substr(0, query.indexOf("|")).trim();

      if(keywords === "*"){
        this.keywordsStr = "";
      }else{
        this.keywordsStr = keywords;
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
        this.keywordsStr = "";
        // invalid filter options
        // display error message to users
        return;
      }
    }else{
      // keywords only, no filter options

      if(query === "*"){
        this.keywordsStr = "";
      }else{
        this.keywordsStr = query;
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

    console.log(queryObject)
    this.mainService.searchAnnotations(queryObject);
  }

  private filterParse (filterStr: string): boolean | Filter {
    // return a javascript object
    // get valid options
    const optionList = [
      "--creator-name", "--editor-name",
      "--document", // by default, only document
      "--current-page", // by default all pages
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
        documentId: null,
        page: null,
        parent:null,
      };

      for(let op of possibleOptions){
        if(op=="--creator-name"){
          if(this.valueOf(filterStr, op)!= false){
            filter["creatorName"] = this.valueOf(filterStr, op) as string;
          }else{
            this.message = "you need supply a valid value for creatorName";
            return;
          }

        }

        if(op=="--editor-name"){
          if(this.valueOf(filterStr, op) != false){
            filter["editorName"] = this.valueOf(filterStr, op) as string;
          }else{
            this.message = "you need to supply a valid value for editorName";
            return;
          }

        }

        if(op=="--document"){
          filter["documentId"] = this.documentId;
        }

        if(op=="--current-page"){
          filter["page"] = this.page;
          filter["documentId"] = this.documentId;
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
}
