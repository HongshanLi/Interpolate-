import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { GroupsLitsService } from "./group-lits/groups-lits.service";
import { GroupThreadsService } from "../group-threads.service";
import { GroupPaper } from "../../models/groupPaper.model";
import { GroupThread } from "../../models/groupThread.model";
import { GroupsService } from "../groups.service";
import { Group } from "../../models/group";
import { Response } from "../../models/response.model";
import { AuthService } from "../../auth/auth.service";
import { GroupResponsesService } from "../group-responses.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { FollowService } from "@app/generalServices/follow.service";
import { SearchService } from "@app/generalServices/search.service";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']

})
export class GroupDetailComponent implements OnInit, OnChanges {
  public group:Group;
  public groupName: string;

  private currentGroupId :string;
  private groupSub:Subscription;

  private uploadedPaper : GroupPaper[] = [];
  public threads: GroupThread[] = [];
  public matchedThreads : GroupThread[] = [];


  public responses: Response[] = [];

  public followingThreads : GroupThread[] = [];

  public showLits = true;

  public showThreads = false;

  private showAllThreads = true;
  private showMyFollows = false;
  private showThreadSearch = false;

  public showManagement = false;

  private newMember:string="Add a new member";
  private errorMessage : string;

  private invitationForm: FormGroup;
  private showInvitationForm: boolean=false;
  private invitationStatusMessage = "";
  private invitationFormInvalid : boolean = false;

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

  ngOnChanges(changes:SimpleChanges){
  }

  ngOnInit() {
    this.groupName = localStorage.getItem("groupName");

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.groupsService.getOneGroup(paramMap.get("groupId")).subscribe(
          res => {
            this.group = res.group;
            //this.fetchGroupActivities(this.group);
          }
        );
      }
    );



    this.interestsForm = new FormGroup({
      interests: new FormControl(null, {validators: [Validators.required]})
    });

    // get the groupThreads the user is following

    this.invitationForm = new FormGroup({
      fullName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
    });

    this.interestsForm = new FormGroup({
      interests: new FormControl(null, {validators: [Validators.required]})
    });

    //

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

  /*
  private timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }
  */


  _showLits(){
    //const el = (<HTMLAnchorElement>event.target);
    this.showLits = true;
    this.showThreads = false;
    this.showManagement = false;
    this.litsService.showAllFiles.next(true);
    //this.groupsService.groupToDisplay.next(this.group);

  }

  displayLit(litId:string){
    this.router.navigate(["lits"], {relativeTo: this.route});
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



  private getLitTitleById(id:string){
    let title :string;
    for (let lit of this.uploadedPaper){
      if (lit._id == id){
        title = lit.title;
        break;
      }
    }
    return title;
  }

  private getGroupById(id:string){
    let group : Group;
    for (let singleGroup of this.groupsService.myGroups){
      if(singleGroup._id === id){
        group = singleGroup;
        break;
      }
    }
    return group;
  }

  // Group management
  manageGroup(){
    this.showLits = false;
    this.showThreads = false;
    this.showManagement = true;
  }

  addMember(event:Event){
    /*
    let newMember = (<HTMLInputElement>event.target).value;
    //this.group.members.push();
    if(this.group.membersName.indexOf(newMember) > -1 ){
      this.errorMessage = newMember + " is already a memeber of this group.";
    } else {
      this.authService.checkUserExist(newMember).subscribe(
        res => {
          this.errorMessage = "";
          this.group.membersName.push(newMember);
          // construct new group
          this.groupsService.updateGroup(this.group);
        },
        error =>{
          console.log(error);
          this.errorMessage = newMember + " is not a registered user." +
          " Invite " + newMember + " to join in the group below.";
        }
      );
    }

    if(this.group.pendingMembers.indexOf(newMember)>-1){
      const index = this.group.pendingMembers.indexOf(newMember);
      this.group.pendingMembers.splice(index);
    }

    (<HTMLInputElement>event.target).value = "";
    */
  }

  addPendingMember(pendingMember: string){
    /*
    const index = this.group.pendingMembers.indexOf(pendingMember);
    this.group.pendingMembers.splice(index);
    this.group.members.push(pendingMember);
    this.groupsService.updateGroup(this.group).subscribe(
      res =>{
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
    */
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

/*
  deleteGroup(){
    this.groupsService.deleteGroup(this.groupsService.getGroupId())
    .subscribe(
      res => {
        console.log(res.message);
      }
    );
    this.router.navigate(["groups"]);
  }
*/

  invitePeople(){
    const formValue = this.invitationForm.value;
    if(this.invitationForm.invalid){
      this.invitationFormInvalid = true;
      return;
    }

    //console.log("is email valid", formValue.email.setValidators(Validators.email));

    this.groupsService.invitePeople(
      this.group._id,
      this.group.groupName,
      formValue.fullName,
      formValue.email)
    .subscribe(
      response => {
        this.invitationFormInvalid = false;
        this.invitationStatusMessage = "An invitation email has been sent to " + formValue.fullName;
        this.invitationForm.reset();
      },
      error => {
        this.invitationStatusMessage = error.error.message;
      }
    );
  }


}
