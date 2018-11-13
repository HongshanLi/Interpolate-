import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from "./groups.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { Group } from "../models/group";


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit, OnDestroy {
  public myGroups : Group[] = [];
  public matchedGroups : Group[] = [];

  public form: FormGroup;
  public groupNameDuplicated: boolean=false;

  public showCreateGroup: boolean = false;
  public showSearch : boolean = false;
  public showMyGroups: boolean = true;


  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    this.groupsService.getMyGroups().subscribe(
      response => {
        this.myGroups = response.groups;
        //this.constructMetaGroups(response.groups);
      }
    );




    this.form = new FormGroup({
      groupName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      groupInterests: new FormControl(null,
        { validators: [Validators.required] }),
      //members: new FormControl(null)
    });

  }


  _showCreateGroup(){
    this.showCreateGroup = true;
    this.showMyGroups = false;
  }


  _showMyGroups(){
    this.showCreateGroup = false;
    this.showSearch = false;
    this.showMyGroups = true;
  }





  displayGroup(group: Group){
    localStorage.setItem("groupName", group.groupName);

    this.router.navigate(["groups", group.groupName, group._id]);

  }

  // create group
  onCreateGroup() {
    let membersArray:string[] = [
      localStorage.getItem("userId")
    ];

    // constructo group object
    let newGroup : Group = {
      _id: null,
      //creatorName: localStorage.getItem("userName"),
      creatorId: localStorage.getItem("userId"),

      groupName: this.form.value.groupName,
      groupInterests: this.form.value.groupInterests,
      membersId: membersArray,
    }

    this.groupsService.createGroup(newGroup)
    .subscribe(
      response => {
        newGroup._id = response.groupId;
        this.groupNameDuplicated = false;
        this.form.reset();
        this.myGroups.push(newGroup);
        this.showMyGroups = true;
        this.showCreateGroup = false;
      },
      error => {
        console.log("Error creating group", error.error.message);
        const groupNameDup = /expected `groupName` to be unique/;
        this.groupNameDuplicated = groupNameDup.test(error.error.message);
      }
    );
  }

  discard(){
    this.form.reset();
    this.showCreateGroup = false;
    this.showMyGroups = true;
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

  ngOnDestroy(){
  }

}
