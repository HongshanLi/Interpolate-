import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { GroupsService } from "@app/groups/groups.service";
import { Group } from "@app/models/group";
import { AuthService } from "@app/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userName : string;

  constructor(
    private router: Router,
    private groupsService: GroupsService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.userName = this.authService.getUserName();
  }


}
