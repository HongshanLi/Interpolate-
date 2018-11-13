import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { Group } from "../models/group";


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  displayGroup(group: Group){
  }

  ngOnDestroy(){
  }

}
