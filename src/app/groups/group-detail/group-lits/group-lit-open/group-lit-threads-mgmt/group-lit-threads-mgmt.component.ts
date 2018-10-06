import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { GroupLitThreadsMgmtService } from "./group-lit-threads-mgmt.service";

@Component({
  selector: 'app-group-lit-threads-mgmt',
  templateUrl: './group-lit-threads-mgmt.component.html',
  styleUrls: ['./group-lit-threads-mgmt.component.css']
})
export class GroupLitThreadsMgmtComponent implements OnInit {
  public showThreadCreate : boolean = false;
  public showThreadsList : boolean = false;
  private subscription : Subscription;
  // single thread to display

  constructor(
    private threadsService: GroupLitThreadsMgmtService
  ) { }

  ngOnInit() {
    this.subscription = this.threadsService.showThreadCreateObs()
    .subscribe(
      res => {
        this.showThreadCreate = res;
      }
    );

  }

  _showThreadCreate(){
    this.showThreadCreate = true;
  }

  _showThreadsList(){
    this.showThreadsList = true;
  }



}
