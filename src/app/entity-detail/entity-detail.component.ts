//dispaly the detail info of a group and class

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Class } from "@app/models/class.model";
import { AuthService } from "@app/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "@env/environment";
@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnInit {
  public entityType:string;

  public entityName: string;
  public entityId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap)=>{
        this.entityName = paramMap.get("entityName");

        this.entityType = paramMap.get("entityType");
        this.entityId = paramMap.get("entityId");
      }
    );
  }



}
