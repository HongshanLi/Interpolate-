import { Component, OnInit, OnChanges,
  SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Annotation } from "@app/models/annotation.model";
import { HighlightCoord } from "@app/models/highlightCoord";
import { AnnotationsService } from "./annotations.service";
import { Subscription } from "rxjs";
import { CommunicationService } from "@app/communication.service";

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {
  private page: number;

  private entityType:string;
  private documentId: string;
  private entityId:string;

  public annCreate: FormGroup;
  private highlightsCoord: HighlightCoord[]=[];

  private sub : Subscription;
  public rootAnns : Annotation[]=[];
  public annToDisplay :Annotation;
  public childAnns: Annotation[] = [];

  constructor(
    private route: ActivatedRoute,
    private mainService: AnnotationsService,
    private comm: CommunicationService
  ) { }

  ngOnChanges(changes: SimpleChanges){
  }

  ngOnInit() {

    this.annCreate = new FormGroup({
      title: new FormControl(null, {
        validators: []
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    // Get all rootAnn in document or entire entity
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.entityType = paramMap.get("entityType");
        this.entityId = paramMap.get("entityId");
        this.documentId = paramMap.get("documentId");

        this.mainService.getAnnotations(
          this.entityType,
          this.entityId,
          this.documentId
        );
      }
    )

    this.sub = this.comm.pageUpdated.subscribe(
      res => {
        this.page = res
      }
    );

    this.sub = this.mainService.rootAnnsUpdated
    .subscribe(
      res => {
        this.rootAnns = res;
        console.log(this.rootAnns);
      }
    );

    this.sub = this.mainService.annToDisplay
    .subscribe(
      res => {
        this.annToDisplay = res;
      }
    );

    this.sub = this.mainService.childAnnsUpdated
    .subscribe(
      res => {
        this.childAnns = res;
      }
    );

  }


  createAnn(parent?: string){

    const annotation : Annotation = {
      _id: null,
      entityType: this.entityType,
      entityId: this.entityId,
      documentId: this.documentId,
      creatorId: null,
      title: this.annCreate.value.content,
      content: this.annCreate.value.content,
      page: this.page,
      highlightsCoord: this.highlightsCoord,
      createTime:Date.now(),
      lastEditTime: null,
      followedBy: [],
      viewedBy:[],
      parent: parent,
      children: []
    }

    this.mainService.createAnnotation(annotation);
}

}
