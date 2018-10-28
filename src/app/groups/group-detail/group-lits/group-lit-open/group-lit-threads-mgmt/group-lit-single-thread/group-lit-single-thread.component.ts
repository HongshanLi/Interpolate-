import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { GroupThreadsService } from "@app/groups/group-threads.service";

import { GroupLitThreadsMgmtService } from "../group-lit-threads-mgmt.service";
import { GroupsLitsService } from
"@app/groups/group-detail/group-lits/groups-lits.service";

import { GroupThread } from "@app/models/groupThread.model";
import { Response } from "@app/models/response.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ResponsesService } from "./responses.service";
import { environment } from "@env/environment";
import { AuthService } from "@app/auth/auth.service";
import { MiscService } from "@app/helpers/misc.service";

@Component({
  selector: 'app-group-lit-single-thread',
  templateUrl: './group-lit-single-thread.component.html',
  styleUrls: ['./group-lit-single-thread.component.css']
})
export class GroupLitSingleThreadComponent implements OnInit, OnDestroy {
  public threadToDisplay : GroupThread;
  public responses : Response[] = [];

  public responseToUpdateId :string = "placeholder"

  public showResponseCreate : boolean = false;
  public showResponseUpdate : boolean = false;

  private responseCreateForm: FormGroup;
  private responseUpdateForm: FormGroup;

  private navigatedThroughThread : boolean;
  private pdfIsReady : boolean;

  private subscription : Subscription;
  private subscription_1 : Subscription;

  public userId : string;

  constructor(
    private authService: AuthService,
    private responsesService: ResponsesService,
    private litThreadsService: GroupLitThreadsMgmtService,
    private litsService: GroupsLitsService,
    private miscService: MiscService,
    private groupThreadsService: GroupThreadsService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");

    this.threadToDisplay = JSON.parse(
      localStorage.getItem("threadToDisplay")
    );

    this.litsService.clearHighlights();

    this.litsService.plotHighlight(
      this.threadToDisplay.highlightsCoord
    );


    this.responseCreateForm = new FormGroup({
      response: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.getAllResponses();

    this.subscription = this.responsesService.allResponsesObs()
    .subscribe(
      res => {
        this.responses = res
      }
    );

  }




  private plotHighlights(){
    this.subscription_1 = this.litsService.pdfIsReadyObs()
    .subscribe(
      res => {

      }
    );
  }

  private getAllResponses(){
    this.responsesService.getAllResponses(this.threadToDisplay._id);
  }

  respondThread(){
    this.showResponseCreate = true;
  }


  updateThread(thread: GroupThread){
    localStorage.setItem("threadToUpdate", JSON.stringify(thread));
    this.litThreadsService.showThreadUpdate.next(true);
    this.litThreadsService.showSingleThread.next(false);
  }

  followThread(threadId: string){
    this.threadToDisplay.followedBy.push(this.userId)
    setTimeout(()=> {
      this.litThreadsService.followThread(threadId, true);
    }, 500);
  }

  unfollowThread(threadId: string){
    this.threadToDisplay.followedBy =
    this.threadToDisplay.followedBy.filter(userId => userId != this.userId)
    setTimeout(()=> {
      this.litThreadsService.followThread(threadId, false);
    },500);
  }

  deleteThread(thread:GroupThread){
    this.litThreadsService.deleteThread(thread);

    this.litsService.clearHighlights();
    this.litThreadsService.showThreadsList.next(true);
    this.litThreadsService.showSingleThread.next(false);
  }

  createResponse(){
    if(this.responseCreateForm.invalid){
      return;
    }
    const response : Response = {
      _id: null,
      threadId: this.threadToDisplay._id,
      groupId: this.threadToDisplay.groupId,
      // @TODO add userid here
      creatorName: this.authService.getUserName(),
      // @TODO add editor Id
      editorName: null,
      responseContent: this.responseCreateForm.value.response,
      createTime: Date.now(),
      lastEditTime: null
    }

    this.responseCreateForm.reset();
    this.responsesService.createResponse(response);
    this.showResponseCreate = false;
  }

  discardResponseCreateForm(){
    this.responseCreateForm.reset();
    this.showResponseCreate = false;
  }

  editResponse(response: Response){
    this.responseToUpdateId= response._id;

    this.responseCreateForm.setValue({
      response: response.responseContent
    });
  }


  updateResponse(responseToUpdate: Response){

    const updatedResponse : Response = {
      _id: responseToUpdate._id,
      threadId: this.threadToDisplay._id,
      groupId: this.threadToDisplay.groupId,
      // @TODO add userid here
      creatorName: responseToUpdate.creatorName,
      // @TODO add editor Id
      editorName: this.authService.getUserName(),
      responseContent: this.responseCreateForm.value.response,
      createTime: responseToUpdate.createTime,
      lastEditTime: Date.now()
    }
    this.responseCreateForm.reset();

    this.responsesService.updateResponse(updatedResponse);
    this.responseToUpdateId = "placeholder";
  }

  deleteResponse(response:Response){
    this.responsesService.deleteResponse(response);
  }

  timestampToDate(timestamp:number){
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  ngOnDestroy(){
    //this.litsService.clearHighlights();
    localStorage.removeItem("threadToDisplay");
    this.subscription.unsubscribe();
  }
}
