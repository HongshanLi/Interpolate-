import { Component, OnInit, OnDestroy } from '@angular/core';
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
      localStorage.getItem("pageNumber")
    );




    this.subscription =
    this.litThreadsService.allThreadsOnThisPageObs()
    .subscribe(
      threads => {
        this.threads = threads;
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
