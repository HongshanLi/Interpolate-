import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupLitThreadsMgmtService } from "../group-lit-threads-mgmt.service";
import { GroupsLitsService } from
"@app/groups/group-detail/group-lits/groups-lits.service";
import { GroupThread } from "@app/models/groupThread.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-group-lit-threads-search',
  templateUrl: './group-lit-threads-search.component.html',
  styleUrls: ['./group-lit-threads-search.component.css']
})
export class GroupLitThreadsSearchComponent implements OnInit, OnDestroy {
  public matchedThreads : GroupThread[]=[];
  private subscription : Subscription;

  constructor(
    private litsService: GroupsLitsService,
    private litThreadsService: GroupLitThreadsMgmtService
  ) { }

  ngOnInit() {
    this.subscription = this.litThreadsService.matchedThreadsObs()
    .subscribe(
      res => {
        this.matchedThreads = res;
      }
    );
  }

  openThread(thread:GroupThread){
    localStorage.setItem("threadToDisplay", JSON.stringify(thread));
    localStorage.setItem("pageNumber", thread.pageNumber.toString());
    this.litsService.pageNumberSubject.next(thread.pageNumber);
    this.litThreadsService.showSingleThread.next(true);
    this.litThreadsService.showThreadsSearch.next(false);

  }


  timestampToDate(timestamp:number){
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
