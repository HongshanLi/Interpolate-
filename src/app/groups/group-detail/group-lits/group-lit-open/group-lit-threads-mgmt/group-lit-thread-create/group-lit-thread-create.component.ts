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
  private threadCreateForm: FormGroup;
  private litId:string;

  constructor(
    private threadsService: GroupLitThreadsMgmtService,
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
    commentor: this.authService.getUserName(),
    editorName: null,
    title: this.threadCreateForm.value.title,
    content: this.threadCreateForm.value.content,
    litId: this.litId,
    litTitle: localStorage.getItem("litTitle"),
    pageNumber: this.litsService.getPageNumber(),
    highlightsCoord: this.litsService.highlightsCoord,
    createTime: Date.now(),
    lastEditTime: null,
    responsesCount: 0,
  };

  this.threadCreateForm.reset();
  this.threadsService.createThread(thread);
  }

}