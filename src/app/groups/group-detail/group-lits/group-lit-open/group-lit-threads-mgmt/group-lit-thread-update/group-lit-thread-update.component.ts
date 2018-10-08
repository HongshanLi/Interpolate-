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
  selector: 'app-group-lit-thread-update',
  templateUrl: './group-lit-thread-update.component.html',
  styleUrls: ['./group-lit-thread-update.component.css']
})
export class GroupLitThreadUpdateComponent implements OnInit {
  private threadToUpdate : GroupThread;
  private threadUpdateForm : FormGroup;


  constructor(
    private litThreadsService: GroupLitThreadsMgmtService,
    private litsService: GroupsLitsService,
    private groupsService: GroupsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.threadToUpdate = JSON.parse(
      localStorage.getItem("threadToUpdate")
    );

    this.threadUpdateForm = new FormGroup({
      title: new FormControl(null, {
      validators: [Validators.required]
      }),
      content: new FormControl(null,{
      validators: [Validators.required]
      })
    });

    this.threadUpdateForm.setValue({
      title: this.threadToUpdate.title,
      content: this.threadToUpdate.content
    });
  }

  updateThread(){
    const thread = this.threadToUpdate;

    const updatedThread: GroupThread = {
      _id: thread._id,
      commentor: thread.commentor,
      editorName: this.authService.getUserName(),
      groupId:thread.groupId,
      title: this.threadUpdateForm.value.title,
      content: this.threadUpdateForm.value.content,
      litId: thread.litId,
      litTitle: thread.litTitle,
      pageNumber: thread.pageNumber,
      highlightsCoord: this.litsService.highlightsCoord,
      createTime: thread.createTime,
      lastEditTime: Date.now(),
      responsesCount: thread.responsesCount,
    }

    this.litThreadsService.updateThread(updatedThread);
    localStorage.setItem("threadToDisplay",
    JSON.stringify(updatedThread));

    this.threadUpdateForm.reset();
    this.litThreadsService.showSingleThread.next(true);
    this.litThreadsService.showThreadUpdate.next(false);


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
    this.threadUpdateForm.reset();
    this.litThreadsService.showThreadUpdate.next(false);
    this.litThreadsService.showThreadsList.next(true);
  }



}
