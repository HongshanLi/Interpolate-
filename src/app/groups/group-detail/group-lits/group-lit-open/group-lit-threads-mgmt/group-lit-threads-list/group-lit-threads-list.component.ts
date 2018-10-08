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

  constructor(
    private litsService: GroupsLitsService,
    private litThreadsService: GroupLitThreadsMgmtService
  ) { }


  ngOnInit() {

    this.subscription = this.litThreadsService.allThreadsOnThisPageObs()
    .subscribe(
      threads => {
        this.threads = threads;
      }
    );
  }

  openThread(thread:GroupThread, expanded:boolean){
    localStorage.setItem("threadToDisplay", JSON.stringify(thread));

    this.litsService.plotHighlight(
      thread.highlightsCoord
    );

    this.litThreadsService.showSingleThread.next(true);
    this.litThreadsService.showThreadsList.next(false);

  }



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
