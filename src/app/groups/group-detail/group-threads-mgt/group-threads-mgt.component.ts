// will get threads as well as responses

import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap } from "@angular/router";
import { GroupThreadsService } from "@app/groups/group-threads.service";
import { GroupThread } from "@app/models/groupThread.model";
import { Response } from "@app/models/response.model";
import { GroupResponsesService } from "@app/groups/group-responses.service";


@Component({
  selector: 'app-group-threads-mgt',
  templateUrl: './group-threads-mgt.component.html',
  styleUrls: ['./group-threads-mgt.component.css']
})
export class GroupThreadsMgtComponent implements OnInit {
  public threads: GroupThread[] = [];
  public responses: Response[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupThreadsService: GroupThreadsService,
    private responsesService: GroupResponsesService
  ) { }

  ngOnInit() {
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
  }

  timestampToDate(timestamp: number){
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

  navigateToThisThread(thread: GroupThread){
    localStorage.setItem("threadToDisplay", JSON.stringify(thread));
    this.groupThreadsService.displaySingleThread.next(true);
    this.router.navigate(["/groups", thread.groupId, thread.litId]);
  }

  searchThreads(event: Event){

  }

}
