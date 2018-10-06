import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { GroupLitThreadsMgmtService } from "../group-lit-threads-mgmt.service";
import { GroupThread } from "@app/models/groupThread.model";


@Component({
  selector: 'app-group-lit-threads-list',
  templateUrl: './group-lit-threads-list.component.html',
  styleUrls: ['./group-lit-threads-list.component.css']
})
export class GroupLitThreadsListComponent implements OnInit {
  public threads : GroupThread[]=[];
  private litId : string;
  private threadId: string;


  constructor(
    private route: ActivatedRoute,
    private threadsService: GroupLitThreadsMgmtService
  ) { }

  ngOnInit() {
    //determine display all threads or single thread
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.litId = paramMap.get("litId");
        this.threadId = paramMap.get("threadId");
        console.log(this.litId, this.threadId);
      }
    )

  }

  getThreadAllThreadsOnThisPage(){
    this.threadsService.getAllThreadsOnThisPage(
      this.litId,
      parseInt(localStorage.getItem("pageNumber"),10)
    );
  }


}
