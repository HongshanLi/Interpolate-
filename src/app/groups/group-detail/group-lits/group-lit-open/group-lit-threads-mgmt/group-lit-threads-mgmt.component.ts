import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
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
  public showThreadsList : boolean = true;
  public showThreadUpdate : boolean = false;
  public showSingleThread : boolean = false;
  public showThreadsSearch : boolean = false;

  private subscription : Subscription;
  // single thread to display

  constructor(
    private litsService: GroupsLitsService,
    private litThreadsService: GroupLitThreadsMgmtService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get litId from the route
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.litId = paramMap.get("litId");
        this.getAllThreadsOnThisPage();
      }
    );

    this.subscription = this.litThreadsService.pageNumberUpdatedObs()
    .subscribe(
      res => {
          this.getAllThreadsOnThisPage();
      }
    );

    this.subscription = this.litThreadsService.showThreadCreateObs()
    .subscribe(
      res => {
        this.showThreadCreate = res;
      }
    );



    this.subscription = this.litThreadsService.showThreadUpdateObs()
    .subscribe(
      res => {
        this.showThreadUpdate = res
      }
    );

    // Don't get threads whenever showThreadsList is true, because
    // user may switch it from threadCreate.
    this.subscription = this.litThreadsService.showThreadsListObs()
    .subscribe(
      res => {
        this.showThreadsList = res;

      }
    );

    this.subscription = this.litThreadsService.showSingleThreadObs()
    .subscribe(
      res => {
        this.showSingleThread = res;
      }
    );

    this.subscription = this.litThreadsService.showThreadsSearchObs()
    .subscribe(
      res => {
        this.showThreadsSearch = res;
      }
    );

    if(localStorage.getItem("threadToDisplay")){
      this.showSingleThread = true;
      this.showThreadsList = false;
    }

  }


  private getAllThreadsOnThisPage(){
    this.litThreadsService.getAllThreadsOnThisPage(
      this.litId,
      parseInt(localStorage.getItem("pageNumber"), 10)
    );
  }



  _showThreadsList(){
    // fetch threads on this page
    localStorage.removeItem("threadToDisplay");
    this.getAllThreadsOnThisPage();
    this.litsService.clearHighlights();
    // Display threads
    this.showThreadsList = true;
    this.showThreadCreate = false;
    this.showThreadUpdate = false;
    this.showSingleThread = false;


    this.litThreadsService.showThreadsSearch.next(false);
  }

  _showThreadCreate(){
    this.showThreadsList = false;
    this.showThreadCreate = true;
    this.showThreadUpdate = false;
    this.showSingleThread = false;

    this.litThreadsService.showThreadsSearch.next(false);
  }



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }





}
