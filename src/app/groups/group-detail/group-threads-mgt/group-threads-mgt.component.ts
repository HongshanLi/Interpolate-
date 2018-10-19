// will get threads as well as responses

import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap } from "@angular/router";

import { Subscription } from "rxjs";
import { GroupThreadsService } from "@app/groups/group-threads.service";
import { GroupThread } from "@app/models/groupThread.model";
import { Response } from "@app/models/response.model";
import { GroupResponsesService } from "@app/groups/group-responses.service";
import { GroupLitThreadsMgmtService } from
"@group-lit-threads-mgmt/group-lit-threads-mgmt.service";

@Component({
  selector: 'app-group-threads-mgt',
  templateUrl: './group-threads-mgt.component.html',
  styleUrls: ['./group-threads-mgt.component.css']
})
export class GroupThreadsMgtComponent implements OnInit {
  public threads: GroupThread[] = [];
  public responses: Response[] = [];
  public userId: string;
  public matchedThreads: GroupThread[]=[];

  public showThreadsList : boolean = true;
  public showThreadsSearch : boolean = false;

  private subscription : Subscription;

  public teststring = "I want to write some stuff with $\\int_a^b$ with highlight";
  public keywordsStr :string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupThreadsService: GroupThreadsService,
    private responsesService: GroupResponsesService,
    private litThreadsService: GroupLitThreadsMgmtService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");


    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        const groupId = paramMap.get("groupId");
        this.groupThreadsService.getThreadsForOneGroup(groupId)
        .subscribe(
          response => {
            this.threads = response.threads.sort(
              function(a, b){
                return b.createTime - a.createTime;
              }
            );
          }
        );
      }
    );

    this.subscription = this.groupThreadsService.showThreadsListObs()
    .subscribe(
      res => {
        this.showThreadsList = res;
      }
    );

    this.subscription = this.groupThreadsService.showThreadsSearchObs()
    .subscribe(
      res => {
        this.showThreadsSearch = res;
      }
    );

  }

  timestampToDate(timestamp: number){
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  openThread(thread:GroupThread){
    if(thread.viewedBy.indexOf(this.userId)==-1){
      this.litThreadsService.addUserToViewedBy(thread._id);
    }
    this.groupThreadsService.showSingleThread.next(true);
    //this.litThreadsService.showSingleThread.next(true);

    localStorage.setItem("threadToDisplay", JSON.stringify(thread));
    localStorage.setItem("pageNumber", thread.pageNumber.toString());
    this.router.navigate(["/groups", thread.groupId, thread.litId]);
  }

  markAsUnread(thread: GroupThread){
    this.litThreadsService.removeUserFromViewedBy(
      thread._id
    );

    this.threads.forEach(
      item => {
        if(item._id == thread._id){
          item.viewedBy = item.viewedBy.filter(
            userId => userId != localStorage.getItem("userId")
          );
        }
      }
    );
  }

  searchThreads(event: Event){
    const queryStr = (<HTMLInputElement>event.target).value;
    this.keywordsStr = queryStr;
    //this.groupThreadsService.keywords.next(queryStr.split(" "));
    this.groupThreadsService.searchThreads(queryStr).subscribe(
      res => {
        this.matchedThreads = res.matchedThreads;
        this.showThreadsSearch = true;
        this.showThreadsList = false;
      }
    );
  }

}
