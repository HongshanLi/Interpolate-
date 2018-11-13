import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public keywordsStr: string;
  public showThreadsSearch :boolean = false;

  public userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private litsService: GroupsLitsService,
    private litThreadsService: GroupLitThreadsMgmtService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");


    this.subscription = this.litThreadsService.matchedThreadsObs()
    .subscribe(
      res => {
        this.keywordsStr = localStorage.getItem("keywordsStr");
        this.matchedThreads = res;
      }
    );


  }

  openThread(thread:GroupThread){
    const currentPage = +localStorage.getItem("pageNumber");

    localStorage.setItem("threadToDisplay", JSON.stringify(thread));
    localStorage.setItem("pageNumber", thread.pageNumber.toString());
    this.litsService.pageNumber.next(thread.pageNumber);

    if(currentPage == thread.pageNumber){
      this.litsService.clearHighlights();
      this.litsService.plotHighlight(
        thread.highlightsCoord
      );
    }


    this.router.navigate(["../view"], {relativeTo:this.route});

  }

  markAsUnread(thread: GroupThread){
    this.litThreadsService.removeUserFromViewedBy(
      thread._id
    );

    this.matchedThreads.forEach(
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
