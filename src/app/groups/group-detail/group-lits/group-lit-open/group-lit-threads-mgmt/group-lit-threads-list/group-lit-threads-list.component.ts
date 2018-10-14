import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private litsService: GroupsLitsService,
    private litThreadsService: GroupLitThreadsMgmtService
  ) { }


  ngOnInit() {
    this.userId = localStorage.getItem("userId");

    this.subscription =
    this.litThreadsService.allThreadsOnThisPageObs()
    .subscribe(
      threads => {
        this.threads = threads;
      }
    );
  }

  openThread(thread:GroupThread){
    localStorage.setItem("threadToDisplay", JSON.stringify(thread));
    if(thread.viewedBy.indexOf(this.userId)==-1){
      this.litThreadsService.addUserToViewedBy(thread._id);
    }

    this.litThreadsService.showSingleThread.next(true);
    this.litThreadsService.showThreadsList.next(false);

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

    //this.allThreadsOnThisPageSubject.next(this.threads);
  }




  timestampToDate(timestamp:number){
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
