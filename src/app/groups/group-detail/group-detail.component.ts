import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { GroupsLitsService } from "./group-lits/groups-lits.service";
import { GroupThreadsService } from "@app/groups/group-threads.service";
import { GroupPaper } from "@app/models/groupPaper.model";
import { GroupThread } from "@app/models/groupThread.model";
import { GroupsService } from "@app/groups/groups.service";
import { Group } from "@app/models/group";
import { Response } from "@app/models/response.model";
import { AuthService } from "@app/auth/auth.service";
import { GroupResponsesService } from "../group-responses.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "@env/environment";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']

})
export class GroupDetailComponent implements OnInit, OnDestroy {
  public group:Group;
  public groupName:string;

  private uploadedPaper : GroupPaper[] = [];
  public threads: GroupThread[] = [];
  public matchedThreads : GroupThread[] = [];


  public responses: Response[] = [];

  public showLits = true;
  public showThreads = false;

  private showAllThreads = true;
  private showMyFollows = false;
  private showThreadSearch = false;

  public showManagement = false;
  public hyperlink : string;


  private errorMessage : string;

  private interestsForm : FormGroup;
  public updateSuccessMessage :string;

  constructor(
    private responsesService: GroupResponsesService,
    private authService: AuthService,
    private litsService: GroupsLitsService,
    private threadsService: GroupThreadsService,
    private router: Router,
    private route: ActivatedRoute,
    private groupsService: GroupsService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.groupName = paramMap.get("groupName");

        this.hyperlink = environment.frontEndUrl + "/groups/join-a-group/"
          + paramMap.get("groupName") + "/" + paramMap.get("groupId");

        this.groupsService.getOneGroup(
          paramMap.get("groupId")
        ).subscribe(
          res => {
            this.group = res.group;

            this.interestsForm = new FormGroup({
              interests: new FormControl(null,
                {validators: [Validators.required]})
            });

            this.interestsForm.setValue({
              interests: this.group.groupInterests
            });

          }
        );

      }
    );







  }


  private fetchGroupActivities(group:Group): void {
    this.litsService.getLitsForOneGroup(group._id)
    .subscribe(
      response => {
        this.uploadedPaper = response.lits.sort(function(a, b){
          return b.uploadTime - a.uploadTime;
        });
      }
    );

    this.threadsService.getThreadsForOneGroup(group._id)
    .subscribe(
      response => {
        this.threads = response.threads.sort(function(a, b){
          return b.createTime - a.createTime;
        });
      }
    );

    this.responsesService.getResponsesForOneGroup(group._id)
    .subscribe(
      response => {
        this.responses = response.responses;
     }
    );
  }




  _showLits(){
    this.showLits = true;
    this.showThreads = false;
    this.showManagement = false;
    this.litsService.showAllFiles.next(true);
    //this.groupsService.groupToDisplay.next(this.group);

  }

  _showThreads(){
    this.threadsService.showThreadsList.next(true);
    this.threadsService.showThreadsSearch.next(false);

    this.showLits = false;
    this.showThreads = true;
    this.showManagement = false;
  }


  _showMyFollows(){
    this.showAllThreads = false;
    this.showMyFollows = true;
    this.showThreadSearch = false;
  }



  // Group management
  manageGroup(){
    this.showLits = false;
    this.showThreads = false;
    this.showManagement = true;


  }


  updateInterests(){
    if(this.interestsForm.invalid){
      return;
    }

    this.group.groupInterests = this.interestsForm.value.interests;
    this.groupsService.updateGroup(this.group).subscribe(
      res => {
        console.log(res);
        this.updateSuccessMessage = "Group interests have been successfully updated!"
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(){
  }



}
