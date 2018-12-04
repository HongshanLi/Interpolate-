//dispaly the detail info of a group and class

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "@app/auth/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "@env/environment";
import { MatTabChangeEvent } from "@angular/material";
import { EntitiesService } from "@app/entities/entities.service"
import { Subscription } from "rxjs"

@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnInit {


  public entityType:string;
  public entity:string;
  public entityName: string;
  public entityId: string;

  private entityData: any;

  public joinLink: string;
  private sub: Subscription;

  public userCanUpload:boolean = true;
  public userName:string;

  public tabIdx:number = 0;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: EntitiesService
  ) { }



  ngOnInit() {


    this.route.paramMap.subscribe(
      (paramMap: ParamMap)=>{
        this.entityName = paramMap.get("entityName");

        this.entityType = paramMap.get("entityType");
        this.entityId = paramMap.get("entityId");

        if(this.entityType==null){
          this.entityType = "my-library"
        }

        if(this.entityType=="classes"){
          this.entity = "class"
        }

        if(this.entityType=="groups"){
          this.entity = "group"
        }

        if(this.entityType!="my-library"){

          this.mainService.getEntityInfo(
            this.entityType,
            this.entityId
          )
        }


        this.joinLink = environment.frontEndUrl + "/entity/join/" + this.entityType  +
        "/" + this.entityName + "/" + this.entityId
      }
    );

    this.sub = this.mainService.selectedEntityUpdated.subscribe(
      res => {
        this.entityData = res;

        if(this.entityType=="classes" && this.entityData.userIsCreator === false){
          this.userCanUpload = false
        }

      }
    );
  }




  onSelectedTabChange(event: MatTabChangeEvent){
    this.tabIdx = event.index;
    console.log(this.tabIdx);
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
