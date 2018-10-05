import { Component, OnInit } from '@angular/core';
import { GroupsService } from "./groups.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { from } from "rxjs/observable/from";
import { map } from "rxjs/operators";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MiscService } from "../helpers/misc.service";
import { Group } from "../models/group";

interface MetaGroup {
  group: Group;
  display: boolean;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit {
  public myGroups : Group[] = [];
  public matchedGroups : Group[] = [];

  private defaultGroupId :string;
  public userName: string;
  private myGroupsUpdated : Subscription;
  private groupToDisplay : Group;
  private showGroupDetail:boolean=false;

  public form: FormGroup;
  public groupNameDuplicated: boolean=false;

  public showCreateGroup: boolean = false;
  public showSearch : boolean = false;
  public showMyGroups: boolean = true;




  public GroupsAtMySchool :Group[] = [];

  constructor(
    private miscService: MiscService,
    private groupsService: GroupsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // Get recently created groups
    this.groupsService.getGroupsAtMySchool().subscribe(
      res => {
        this.GroupsAtMySchool = res.groups;
      }
    );



    this.defaultGroupId = this.groupsService.getGroupId();
    this.userName = this.authService.getUserName();
    this.groupsService.getMyGroups(this.userName).subscribe(
      response => {
        this.groupsService.myGroups = response.groups;
        this.myGroups = response.groups;
        //this.constructMetaGroups(response.groups);
        this.displayDefaultGroup(response.groups);
      }
    );




    this.form = new FormGroup({
      groupName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      groupInterests: new FormControl(null, { validators: [Validators.required] }),
      //members: new FormControl(null)
    });

  }


  _showCreateGroup(){
    this.showCreateGroup = true;
  }


  _showMyGroups(){
    this.showCreateGroup = false;
    this.showSearch = false;
    this.showMyGroups = true;
  }


  private displayDefaultGroup(groups: Group[]){
    if(this.groupsService.getGroupId()){
      groups.forEach(
        group => {
          if(group._id == this.groupsService.getGroupId()){
            this.groupsService.groupToDisplay.next(group);
            return;
          }
        }
      );
    }else{
      return;
    }
  }


  displayGroup(group: Group){

    this.groupsService.activatedGroup = group;
    this.groupsService.setGroupName(group.groupName);
    this.groupsService.setGroupId(group._id);
    this.router.navigate(["groups", group._id]);


  }
  /*

  private highlightThisGroup(group: Group){
    this.myGroups.forEach(g => {
      const el = document.getElementById(g._id);
      if(g._id === group._id){
        el.style.backgroundColor = "#BDDBF4";
      }else{
        el.style.backgroundColor = "white";
      }
    });
  }
  */

  // create group
  onCreateGroup() {
    let membersArray:string[] = [this.userName];
    // constructo group object
    let newGroup : Group = {
      _id: this.miscService.createRandomString(20),
      creator: this.authService.getUserName(),
      groupName: this.form.value.groupName,
      groupInterests: this.form.value.groupInterests,
      members: membersArray,
      pendingMembers: [],
    }

    this.groupsService.createGroup(newGroup)
    .subscribe(
      response => {
        this.groupNameDuplicated = false;
        this.unhighlightAllGroups();
        this.form.reset();
        this.groupsService.setGroupId(newGroup._id);
        this.groupsService.groupToDisplay.next(newGroup);
        this.myGroups.push(newGroup);
        this.displayGroup(newGroup);
        this.defaultGroupId = newGroup._id;
        //this.highlightThisGroup(newGroup);
      },
      error => {
        console.log("Error creating group", error.error.message);
        const groupNameDup = /expected `groupName` to be unique/;
        this.groupNameDuplicated = groupNameDup.test(error.error.message);
      }
    );

  }

  search(event: Event){
    this.showSearch = true;
    this.showMyGroups = false;

    const queryStr = (<HTMLInputElement>event.target).value;
    this.groupsService.searchGroup(queryStr).subscribe(
      response => {
        this.matchedGroups = response.results;
      }
    );


  }

  private unhighlightAllGroups(){
    this.myGroups.forEach(group => {
      let el = document.getElementById(group._id);
      el.style.backgroundColor = "white";
    });
  }

}
