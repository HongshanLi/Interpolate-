import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { GroupLitThreadsMgmtService } from "../group-lit-threads-mgmt.service";
import { GroupThread } from "@app/models/groupThread.model";
import { GroupThreadsService } from "@app/groups/group-threads.service";
@Component({
  selector: 'app-group-lit-threads-list',
  templateUrl: './group-lit-threads-list.component.html',
  styleUrls: ['./group-lit-threads-list.component.css']
})
export class GroupLitThreadsListComponent implements OnInit {
  public threads : GroupThread[]=[];
  public threadToDisplay : GroupThread;

  private litId : string;
  private threadId: string;

  private subscription: Subscription;

  public displaySingleThread : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private litThreadsService: GroupLitThreadsMgmtService,
    private groupThreadsService: GroupThreadsService
  ) { }

  ngOnInit() {
    //determine display all threads or single thread

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.litId = paramMap.get("litId");
        this.threadId = paramMap.get("threadId");
        if(this.threadId){
          this.displaySingleThread = true;
          console.log(this.displaySingleThread);
        }
        this.getAllThreadsOnThisPage();
      }
    );


    this.subscription =
    this.groupThreadsService.threadToDisplayObs()
    .subscribe(
      res => {
        this.threadToDisplay = res;
        console.log(this.threadToDisplay);
      }
    );

    this.subscription =
    this.litThreadsService.allThreadsOnThisPageObs()
    .subscribe(
      res => {
        this.threads = res;
      }
    );


  }

  getAllThreadsOnThisPage(){
    this.litThreadsService.getAllThreadsOnThisPage(
      this.litId,
      parseInt(localStorage.getItem("pageNumber"),10)
    );
  }

  deleteThread(thread:GroupThread){
    this.litThreadsService.deleteThread(thread._id, thread.litId);
  }


}
