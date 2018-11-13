import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { GroupLitThreadsMgmtService } from "../group-lit-threads-mgmt.service";
import { GroupsLitsService } from
"@app/groups/group-detail/group-lits/groups-lits.service";
import { GroupThread } from "@app/models/groupThread.model";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-group-lit-threads-list',
  templateUrl: './group-lit-threads-list.component.html',
  styleUrls: ['./group-lit-threads-list.component.css']
})
export class GroupLitThreadsListComponent implements OnInit, OnDestroy {
  public threads : GroupThread[]=[];
  private subscription : Subscription;
  public userId : string;

  public pageSize = 4;
  public currentPage = 1;
  public pageSizeOptions = [4, 8, 10];

  public totalThreads :number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private litsService: GroupsLitsService,
    private litThreadsService: GroupLitThreadsMgmtService
  ) { }


  ngOnInit() {

    this.userId = localStorage.getItem("userId");

    this.litThreadsService.getAllThreadsOnThisPage(
      localStorage.getItem("litId"),
      localStorage.getItem("pageNumber"),
      this.pageSize.toString(),
      this.currentPage.toString()
    );




    this.subscription =
    this.litThreadsService.allThreadsOnThisPageObs()
    .subscribe(
      res => {
        this.threads = res.threads;
        this.totalThreads = res.totalThreads;
      }
    );
  }

  openThread(thread:GroupThread){
    /*localStorage.setItem("threadToDisplay", JSON.stringify(thread));
    if(thread.viewedBy.indexOf(this.userId)<0){
      thread.viewedBy.push(this.userId);
      localStorage.setItem("threadToDisplay", JSON.stringify(thread));
      this.litThreadsService.addUserToViewedBy(thread._id);
    }

    this.litsService.plotHighlight(
      thread.highlightsCoord
    );

    this.litThreadsService.showSingleThread.next(true);
    this.litThreadsService.showThreadsList.next(false);
    */
    localStorage.setItem("threadToDisplay", JSON.stringify(thread));
    this.router.navigate(["../view"], {relativeTo: this.route});

        this.litsService.plotHighlight(
          thread.highlightsCoord
        );
  }

  onChangePagination(pageData: PageEvent){
    this.currentPage = pageData.pageIndex +1;
    this.pageSize = pageData.pageSize;

    this.litThreadsService.getAllThreadsOnThisPage(
      localStorage.getItem("litId"),
      localStorage.getItem("pageNumber"),
      this.pageSize.toString(),
      this.currentPage.toString()
    );

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




  timestampToDate(timestamp:number){
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
