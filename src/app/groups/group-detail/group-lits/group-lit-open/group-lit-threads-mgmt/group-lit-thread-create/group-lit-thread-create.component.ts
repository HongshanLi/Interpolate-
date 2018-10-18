import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { GroupLitThreadsMgmtService }
from '@group-lit-threads-mgmt/group-lit-threads-mgmt.service';
import { GroupsLitsService } from '@app/groups/group-detail/group-lits/groups-lits.service';
import { GroupsService } from '@app/groups/groups.service';
import { AuthService } from "@app/auth/auth.service";
import { GroupThread } from '@app/models/groupThread.model';
import { MiscService } from "@app/helpers/misc.service";
import { environment } from "@env/environment";


@Component({
  selector: 'app-group-lit-thread-create',
  templateUrl: './group-lit-thread-create.component.html',
  styleUrls: ['./group-lit-thread-create.component.css']
})
export class GroupLitThreadCreateComponent implements OnInit {
  public threadCreateForm: FormGroup;
  private litId:string;

  constructor(
    private litThreadsService: GroupLitThreadsMgmtService,
    private miscService: MiscService,
    private litsService: GroupsLitsService,
    private groupsService: GroupsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap)=> {
        this.litId = paramMap.get("litId");
      }
    );

    this.threadCreateForm = new FormGroup({
      title: new FormControl(null, {
      validators: [Validators.required]
      }),
      content: new FormControl(null,{
      validators: [Validators.required]
      })
    });
  }

  createThread(){
  let threadId = this.miscService.createRandomString(
    environment.threadIdLength)
  + '@' + this.litId;

  // construct thread object
  let thread : GroupThread ={
    _id: threadId,
    groupId: this.groupsService.getGroupId(),
    creatorName: this.authService.getUserName(),
    creatorId: localStorage.getItem("userId"),
    editorName: null,
    editorId: null,
    title: this.threadCreateForm.value.title,
    content: this.threadCreateForm.value.content,
    litId: this.litId,
    litTitle: localStorage.getItem("litTitle"),
    pageNumber: this.litsService.getPageNumber(),
    highlightsCoord: this.litsService.highlightsCoord,
    createTime: Date.now(),
    lastEditTime: null,
    followedBy : [],
    viewedBy: [localStorage.getItem("userId")],
    responsesCount: 0,
  };

  this.litsService.clearHighlights();
  this.threadCreateForm.reset();
  this.litThreadsService.createThread(thread);

  localStorage.setItem(
    "threadToDisplay",
    JSON.stringify(thread)
  );

  this.litsService.plotHighlight(
    thread.highlightsCoord
  );


  this.litThreadsService.showSingleThread.next(true);
  this.litThreadsService.showThreadCreate.next(false);
  }

  addHighlight(){
    if(!this.litsService.inHighlightMode){
      this.litsService.inHighlightMode = true;
    } else {
      this.litsService.inHighlightMode = false;
    }

    this.litsService.highlightsCoord = [];

    let all = Array.prototype.slice.call(
      document.getElementsByTagName("canvas"));

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
  }

  discardThreadDraft(){
    this.threadCreateForm.reset();
    this.litThreadsService.showThreadCreate.next(false);
    this.litThreadsService.showThreadsList.next(true);
  }



}
