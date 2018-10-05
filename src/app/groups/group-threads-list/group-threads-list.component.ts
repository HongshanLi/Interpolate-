import { Component, OnInit, OnChanges, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ElementRef } from "@angular/core";
import { GroupThreadsService } from '../group-threads.service';
import { GroupResponsesService } from '../group-responses.service';
import { GroupsLitsService } from '../group-lits/groups-lits.service';
import { GroupsService } from '../groups.service';
import { AuthService } from "../../auth/auth.service";
import { GroupThread } from '../../models/groupThread.model';
import { Response } from '../../models/response.model';

import { Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import "mathjax";
import { MiscService } from "../../helpers/misc.service";
import { environment } from "../../../environments/environment";

import { from } from "rxjs/observable/from";
import { map } from "rxjs/operators";
import { MatExpansionPanel } from "@angular/material";
import { FollowService } from "@app/generalServices/follow.service";

interface MetaResponse {
  response: Response;
  inEditMode: boolean;

}

interface ThreadWithResponses {
  thread: GroupThread;
  inEditMode: boolean;
  isExpanded: boolean;
  isResponding: boolean;
  responses: MetaResponse[];
}
@Component({
  selector: 'app-group-threads-list',
  templateUrl: './group-threads-list.component.html',
  styleUrls: ['./group-threads-list.component.css'],
  providers: [GroupResponsesService]
})
export class GroupThreadsListComponent implements OnInit, OnChanges {

  @Input() pageNumber: number;
  @Input() pdfSize: number;

  public threadsWithResponses : ThreadWithResponses[] = [];
  private litId: string;
  private groupName:string;
  @Input() showCreateForm : boolean = false;

  private form: FormGroup; // form to create response
  private formUpdate: FormGroup; // form to update response
  private threadCreateForm:FormGroup;
  private threadUpdateForm:FormGroup;

  private dataIsReadySubject = new Subject<boolean>();

  private metaDataSubject = new Subject<ThreadWithResponses[]>();

  private dataIsReadySub : Subscription;

  private threadToDisplay: GroupThread;

  public threadsToFollowIdList :string[] = [];

  private pdfIsReadySub : Subscription;

  private dataIsReady = false;
  private pdfIsReady = false;

  private allReadySubject = new Subject<boolean>();
  private allReadySub : Subscription;

  constructor(
    private miscService: MiscService,
    private litsService: GroupsLitsService,
    private threadsService: GroupThreadsService,
    private responsesService: GroupResponsesService,
    private groupsService: GroupsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private followService: FollowService) {

    }

    ngOnChanges(changes: SimpleChanges){

      this.litId = this.litsService.getLitId();
      this.threadsService.getThreadsFrom(this.litId, this.pageNumber)
      .subscribe(response => {
          this.constructStructuredData(response.threads.sort(function(a, b){
            return b.createTime - a.createTime;
          }));
      });

      this.metaDataSubject.subscribe(
        res => {
          this.threadsWithResponses = res;

          this.dataIsReadySubject.next(true);
        }
      );

      if(changes.pdfSize){
        for (let metaThread of this.threadsWithResponses){
          if(metaThread.isExpanded){
            this.litsService.plotHighlight(
              metaThread.thread.highlightsCoord
            );
          }
        }
      }


    }

  ngOnInit() {
    this.litId = this.litsService.getLitId();

    // form for creating a response
    this.form = new FormGroup({
      response: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    // form to update a response
    this.formUpdate = new FormGroup({
      response: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    //instantiate the create forms
    this.threadCreateForm = new FormGroup({
      title: new FormControl(null, {
      validators: [Validators.required]
      }),
      content: new FormControl(null,{
      validators: [Validators.required]
      })
    });

    //instantiate update form
    this.threadUpdateForm = new FormGroup({
      title: new FormControl(null, {
      validators: [Validators.required]
      }),
      content: new FormControl(null,{
      validators: [Validators.required]
      })
    });

    // thread to follow id list
    this.followService.getFollowingGroupThreads().subscribe(
      res => {
        res.followingThreads.forEach(thread => {
          this.threadsToFollowIdList.push(thread._id);
        }
      );
      }
    );


    this.pdfIsReadySub = this.litsService.pdfIsReadyListener().subscribe(
      pdfIsReady =>{
        this.pdfIsReady = pdfIsReady;
        this.allReadySubject.next(this.pdfIsReady && this.dataIsReady);
      }
    );

    this.dataIsReadySub = this.dataIsReadyListener().subscribe(
      dataIsReady => {
        this.dataIsReady = dataIsReady;
        this.allReadySubject.next(this.pdfIsReady && this.dataIsReady);
      }
    );

    this.allReadySub = this.allReadyListener().subscribe(
      res => {
        if(res){
          this.allReadySub.unsubscribe();
          if(this.threadsService.getThreadToDisplay()){
            this.litsService.plotHighlight(this.threadToDisplay.highlightsCoord);
          }

          //this.threadsService.removeThreadToDisplay();
          this.threadToDisplay = null;
          return;
        }
      }
    );

  }

  private allReadyListener(){
    return this.allReadySubject.asObservable();
  }

  private dataIsReadyListener(){
    return this.dataIsReadySubject.asObservable();
  }

  // get responses for all threads
  // populate threadsWithResponses
  private constructStructuredData(threads: GroupThread[]){
    let metaData  : ThreadWithResponses[] = [];
    for (let thread of threads){
      let metaResponses = [];


      if(thread._id === this.threadsService.getThreadToDisplay()){
        this.threadToDisplay = thread;
      }

      this.responsesService.getResponses(thread._id)
      .subscribe(
        res => {
          const source = from(res.responses);

          // construct metadata
          source.pipe(map(
            response => {
              return {
                response: response,
                inEditMode: false,
              };
            }
          )).subscribe(
            response => {
              metaResponses.push(response);
            }
          );

          metaData.push({
            thread: thread,
            inEditMode: false,
            isExpanded: this.threadsService.getThreadToDisplay() == thread._id? true: false,
            isResponding: false,
            responses: metaResponses,
          });
        }
      );
    }
    this.metaDataSubject.next(metaData);
  }


  private timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  //create thread
  highlight(){
    this.litsService.inHighlightMode = !this.litsService.inHighlightMode;

    // clear highlight coord from previous threads
    this.litsService.highlightsCoord = [];
    let all = Array.prototype.slice.call(document.getElementsByTagName("canvas"));
    const button = document.getElementById("highlight");
    if(this.litsService.inHighlightMode){
      button.style.border = "solid blue"
      for(let el of all){
        el.style.cursor = "text";
      }
    }else{
      button.style.border = "none";
      for(let el of all){
        el.style.cursor = "default";
      }
    }

  }

  clearHighlight(){
    this.litsService.clearHighlights();
    this.showHighlightsForExpandedThreads();
  }



  onCreateThread(){
    let threadId = this.miscService.createRandomString(environment.threadIdLength)
    + '@' + this.litId;

    // construct thread object
    let thread : GroupThread ={
      _id: threadId,
      groupId: this.groupsService.getGroupId(),
      commentor: this.authService.getUserName(),
      editorName: null,
      title: this.threadCreateForm.value.title,
      content: this.threadCreateForm.value.content,
      litId: this.litId,
      pageNumber: this.pageNumber,
      highlightsCoord: this.litsService.highlightsCoord,
      createTime: Date.now(),
      lastEditTime: null,
      responsesCount: 0,
    };

    this.threadCreateForm.reset();
    this.threadsService.addThread(thread)
    .subscribe(
      res=>{
        console.log(res.message);
        // construct meta thread
        const metaThread : ThreadWithResponses = {
          thread: thread,
          inEditMode: false,
          isExpanded: true,
          isResponding: false,
          responses: [],
        }

        this.threadsWithResponses.unshift(metaThread);
        this.showCreateForm = false;

        this.litsService.clearHighlights();
        this.showHighlightsForExpandedThreads();
      });


  }

  // following a thread
  followThisThread(threadId:string){
    this.followService.followThisGroupThread(threadId).subscribe(
      res =>{
        console.log(res.message);
        this.threadsToFollowIdList.push(threadId);
      }
    );

  }

  unfollowThisThread(threadId: string){
    this.followService.unfollowThisGroupThread(threadId).subscribe(
      res => {
        console.log(res.message);
        const index = this.threadsToFollowIdList.indexOf(threadId);
        this.threadsToFollowIdList.splice(index);
      }
    );
  }



  onClickThread(
    threadWithResponses:ThreadWithResponses,
    expanded: boolean){
    this.changeThreadState(threadWithResponses, expanded);

    /*
    this.litsService.clearHighlightsWithCallback(
      (error: Error, completed:boolean):void =>{
        if(completed){
          this.showHighlightsForExpandedThreads();
        }
      }
    );
    */
    console.log(expanded);
    this.litsService.clearHighlights();
    //this.litsService.plotHighlight(threadWithResponses.thread.highlightsCoord);


    setTimeout(()=> {
      this.showHighlightsForExpandedThreads();
    }, 100);


  }


  private changeThreadState(
    threadWithResponses: ThreadWithResponses,
    expanded: boolean){
    let index = this.threadsWithResponses.indexOf(threadWithResponses);
    this.threadsWithResponses[index].isExpanded = expanded;

  }

  private showHighlightsForExpandedThreads(){
    for (let metaThread of this.threadsWithResponses){
      if(metaThread.isExpanded){
        this.litsService.plotHighlight(
          metaThread.thread.highlightsCoord
        );
      }
    }
  }



  //put threads
  private changeInEditModeForMetaThread(threadId:string, inEditMode:boolean): void {
    for (let meta of this.threadsWithResponses){
      if(meta.thread._id == threadId){
        meta.inEditMode = inEditMode;
        break;
      }
    }
  }
  onUpdate(meta: ThreadWithResponses){
    this.changeInEditModeForMetaThread(meta.thread._id, true);
    this.changeThreadState(meta, false);
    this.threadUpdateForm.setValue({
      title: meta.thread.title,
      content:meta.thread.content
    });
  }

  submitUpdate(thread:GroupThread){
    //constrt thread object
    let updatedThread: GroupThread = {
      _id: thread._id,
      commentor: thread.commentor,
      editorName: this.authService.getUserName(),
      groupId:thread.groupId,
      title: this.threadUpdateForm.value.title,
      content: this.threadUpdateForm.value.content,
      litId: thread.litId,
      pageNumber: thread.pageNumber,
      highlightsCoord: this.litsService.highlightsCoord,
      createTime: thread.createTime,
      lastEditTime: Date.now(),
      responsesCount: thread.responsesCount,
    };


    this.threadUpdateForm.reset();
    this.changeInEditModeForMetaThread(thread._id, false);

    this.threadsService.updateThread(updatedThread)
    .subscribe(
      response => {
        this.replaceThread(updatedThread, true);
        this.litsService.clearHighlights();
        this.showHighlightsForExpandedThreads();
    });


  }

  private replaceThread(thread:GroupThread, expanded:boolean = true){
    for (let meta of this.threadsWithResponses){
      if (meta.thread._id === thread._id){
        let index = this.threadsWithResponses.indexOf(meta);
        this.threadsWithResponses[index].thread = thread;
        this.threadsWithResponses[index].isExpanded = expanded;
        break;
      }
    }
  }


  //////////////////////////////////////////////////////////////////////////
  // Delete thread
  private userCanDeleteThread(commentor: string): boolean {
    if(commentor === this.authService.getUserName()){
      return true;
    } else {
      return false;
    }
  }

  onDelete(threadId: string, litId:string){
    this.threadsService.deleteThread(threadId, litId)
    .subscribe(
      response => {
        let updatedMetaThreads = this.threadsWithResponses
        .filter(metaThread => metaThread.thread._id !== threadId);
        this.threadsWithResponses = updatedMetaThreads;
        this.litsService.clearHighlights();
        this.showHighlightsForExpandedThreads()
    });
  }



  //response handlers

  onRespond(threadId:string){
    for(let metaThread of this.threadsWithResponses){
      if(metaThread.thread._id===threadId){
        metaThread.isResponding = !metaThread.isResponding;
      }
    }
  }

  // post
  createResponse(threadId:string){
    // construct response object
    let responseId = this.miscService.createRandomString(environment.responseIdLength)
    + '@' + threadId;
    let response : Response = {
      _id: responseId,
      threadId: threadId,
      groupId: this.groupsService.getGroupId(),
      creatorName: this.authService.getUserName(),
      editorName: null,
      responseContent: this.form.value.response,
      createTime: Date.now(),
      lastEditTime: null,
    };

    // construct meta response
    const metaResponse : MetaResponse = {
      response : response,
      inEditMode : false,
    };

    this.responsesService.addResponse(response)
    .subscribe(
      res => {
        console.log(res.message);
        this.addOneMetaResponse(metaResponse);
      }
    );
    this.form.reset();

    for(let metaThread of this.threadsWithResponses){
      if(metaThread.thread._id===threadId){
        metaThread.isResponding = false;
      }
    }
  }

  private addOneMetaResponse(metaResponse: MetaResponse): void {
    for(let metaThread of this.threadsWithResponses){
      if(metaThread.thread._id === metaResponse.response.threadId){
        metaThread.responses.push(metaResponse);
        break;
      }
    }
  }


  //put
  updateResponse(metaResponse: MetaResponse, metaThread: ThreadWithResponses){
    let threadIndex = this.threadsWithResponses.indexOf(metaThread);
    let resIndex = metaThread.responses.indexOf(metaResponse);

    // change the inEditMode of each response
    // show response update form
    this.threadsWithResponses[threadIndex].responses[resIndex].inEditMode =
    !this.threadsWithResponses[threadIndex].responses[resIndex].inEditMode

    this.formUpdate.setValue({
      response: metaResponse.response.responseContent
    });
  }

  submitUpdatedResponse(
    metaResponse: MetaResponse,
    metaThread: ThreadWithResponses){
    // construct the updated response
    const res = metaResponse.response;

    let updatedResponse : Response = {
      _id: res._id,
      threadId: res.threadId,
      groupId: res.groupId,
      creatorName: res.creatorName,
      editorName: this.authService.getUserName(),
      responseContent: this.formUpdate.value.response,
      createTime: res.createTime,
      lastEditTime: Date.now(),
    };

    this.responsesService.updateResponse(updatedResponse)
    .subscribe(
      result => {
        console.log(result.message);
        // construct new metaResponse
        const newMetaResponse : MetaResponse = {
          response: updatedResponse,
          inEditMode: false,
        }

        this.replaceResponse(newMetaResponse, metaResponse, metaThread);
      }
    );
  }

  private replaceResponse(
    newMetaResponse: MetaResponse,
    oldMetaResponse:MetaResponse,
    metaThread: ThreadWithResponses){

    let threadIndex = this.threadsWithResponses.indexOf(metaThread);
    let resIndex = metaThread.responses.indexOf(oldMetaResponse);

    this.threadsWithResponses[threadIndex].responses[resIndex] = newMetaResponse
  }



  // delete
  private userCanDeleteResponse(creatorName:string): boolean {
    if(creatorName===this.authService.getUserName()){
      return true;
    } else {
      return false;
    }
  }

  deleteResponse(metaResponse: MetaResponse){
    this.responsesService.deleteResponse(
      metaResponse.response._id,
      metaResponse.response.threadId)
    .subscribe(
      result => {
        this.removeOneMetaResponse(metaResponse);
      }
    );
  }

  private removeOneMetaResponse(metaResponse: MetaResponse): void {
    for(let metaThread of this.threadsWithResponses){
      if(metaThread.thread._id === metaResponse.response.threadId){
        const index = metaThread.responses.indexOf(metaResponse);
        metaThread.responses.splice(index, 1);
      }
    }
  }


  //replot highlight on window size change;
  onWindowResize(event: Event){
    setTimeout(()=> {
      this.litsService.clearHighlights();
      this.showHighlightsForExpandedThreads();
    }, 500);

  }



  ngOnDestroy(){
  }


}
