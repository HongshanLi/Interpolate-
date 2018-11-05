import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { GroupLitThreadsMgmtService } from "./group-lit-threads-mgmt.service";
import { GroupsLitsService } from
"@app/groups/group-detail/group-lits/groups-lits.service";

@Component({
  selector: 'app-group-lit-threads-mgmt',
  templateUrl: './group-lit-threads-mgmt.component.html',
  styleUrls: ['./group-lit-threads-mgmt.component.css']
})
export class GroupLitThreadsMgmtComponent implements OnInit, OnDestroy {
  private litId:string;

  public showThreadCreate : boolean = false;
  public showThreadsList : boolean = false;
  public showThreadUpdate : boolean = false;
  public showSingleThread : boolean = false;
  public showThreadsSearch : boolean = false;

  private subscription : Subscription;
  // single thread to display

  constructor(
    private router: Router,
    private litsService: GroupsLitsService,
    private litThreadsService: GroupLitThreadsMgmtService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        localStorage.setItem("litId", paramMap.get("litId"));
        localStorage.setItem("groupId", paramMap.get("groupId"));
      }
    );
  }



  _showThreadsList(){
    this.router.navigate(["list"], {relativeTo: this.route});
  }

  _showThreadCreate(){
    this.router.navigate(["create"], {relativeTo: this.route});
  }



  searchThreads(event: Event){
    const keywordsStr = (<HTMLInputElement>event.target).value;

        this.litThreadsService.searchThreads(
          keywordsStr,
          localStorage.getItem("litId"),
          localStorage.getItem("groupId")
        );

        localStorage.setItem("keywordsStr", keywordsStr);
    //localStorage.setItem("keywordsStr", keywordsStr);
    this.router.navigate(["search"], {relativeTo: this.route});
  }



  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }





}
