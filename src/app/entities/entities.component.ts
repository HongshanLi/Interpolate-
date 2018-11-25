import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../auth/auth.service";

import { Router } from "@angular/router";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Class } from "@app/models/class.model";
import { Group } from "@app/models/group.model";
import { EntitiesService } from "@app/entities/entities.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  public entityType:string;
  public singleEntity:string;

  public myEntities : Class[] | Group[] = [];
  public form: FormGroup;
  private sub : Subscription;




  constructor(
    private route: ActivatedRoute,
    private mainService: EntitiesService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.entityType = paramMap.get("entityType");
        if(this.entityType==="classes"){
          this.singleEntity = "class"
        }
        if(this.entityType==="groups"){
          this.singleEntity = "group"
        }


        this.mainService.getEntities(this.entityType)
      }
    )


    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null,
        { validators: [Validators.required] }),
    });

    this.sub = this.mainService.myEntitiesUpdated.subscribe(
      res => {
        this.myEntities = res;
      }
    )
  }

  createEntity(){
    if(this.form.invalid){
      return;
    }
    if(this.entityType==="classes"){
      // constructo group object
      let newClass : Class = {
        _id: null,
        creatorId: "backend",
        name: this.form.value.name,
        description: this.form.value.description,
        membersId: [],
      }

      this.mainService.createEntity("classes", newClass)
    }

    if(this.entityType==="groups"){

      let newGroup : Group = {
        _id: null,
        creatorId: "backend",
        name: this.form.value.name,
        description: this.form.value.description,
        membersId: [],
      }

       this.mainService.createEntity("groups", newGroup)
    }

    this.form.reset();
  }



  displayEntity(entity: Class | Group){
    this.router.navigate(["entity", this.entityType, entity.name, entity._id]);
  }

}
