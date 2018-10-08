import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { GroupLitThreadsMgmtService } from "../group-lit-threads-mgmt.service";
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
export class GroupLitSingleThreadComponent implements OnInit {
  public threadToDisplay : GroupThread;
  public responses : Response[] = [];

  public responseToUpdateId :string = "placeholder"

  public showResponseCreate : boolean = false;
  public showResponseUpdate : boolean = false;

  private responseCreateForm: FormGroup;
  private responseUpdateForm: FormGroup;

  private subscription : Subscription;

  constructor(
    private authService: AuthService,
    private responsesService: ResponsesService,
    private litThreadsService: GroupLitThreadsMgmtService,
    private miscService: MiscService
  ) { }

  ngOnInit() {
    this.threadToDisplay = JSON.parse(
      localStorage.getItem("threadToDisplay")
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

  private getAllResponses(){
    this.responsesService.getAllResponses(this.threadToDisplay._id);
  }

  respondThread(thread: GroupThread){
    this.showResponseCreate = true;
  }


  updateThread(thread: GroupThread){
    localStorage.setItem("threadToUpdate", JSON.stringify(thread));
    this.litThreadsService.showThreadUpdate.next(true);
    this.litThreadsService.showSingleThread.next(false);
  }

  followThread(thread: GroupThread){

  }

  unfollowThread(thread: GroupThread){

  }

  deleteThread(thread:GroupThread){
    this.litThreadsService.deleteThread(thread._id, thread.litId);
    this.litThreadsService.showThreadsList.next(true);
    this.litThreadsService.showSingleThread.next(false);
  }

  createResponse(){
    console.log('heooo')
    const responseId = this.miscService.createRandomString(
      environment.responseIdLength
    ) + "@" + this.threadToDisplay._id

    const response : Response = {
      _id: responseId,
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

    this.responsesService.createResponse(response);
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

  timestampToDate(timestamp:number){
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }
}
