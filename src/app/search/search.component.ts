import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { GroupsService } from "../groups/groups.service";
import { Group } from "../models/group";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public users = [];
  public groups = [];
  public errorMessage :string;
  public requestSentSuccessMessage : string;
  public groupToJoinName : string;
  public showSearch : boolean = false;
  public showHelp : boolean = false;

  constructor(
    private authService: AuthService,
    private groupsService: GroupsService
  ) { }

  ngOnInit() {
  }

  search(event: Event){
    const queryStr = (<HTMLInputElement>event.target).value;
    this.groupsService.searchGroup(queryStr).subscribe(
      response => {
        this.groups = response.results;
      }
    );
    (<HTMLInputElement>event.target).value ="";
  }

  joinGroup(group: Group){
    const userName = this.authService.getUserName();
    this.groupToJoinName = group.groupName;
    if(group.members.indexOf(userName) > -1){
      this.errorMessage = "You are already a member of " + group.groupName;
      return;
    }

    group.pendingMembers.push(userName);
    // remove redundancy
    group.pendingMembers = Array.from(new Set(group.pendingMembers));

    this.groupsService.updateGroup(group).subscribe(
      res => {
        this.requestSentSuccessMessage = "Membership request has been sent."
      },
      error => {
        console.log(error);
      }
    );

  }

  _showHelp(){
    this.showHelp = true;
  }





}
