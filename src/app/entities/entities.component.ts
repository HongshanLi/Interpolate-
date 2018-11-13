import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassesService } from "./classes.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Class } from "@app/models/class.model";
import { Group } from "@app/models/group"
import { EntitiesService } from "@app/entities/entities.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  public entityType:string;


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
        this.mainService.getEntities()
      }
    )


    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null,
        { validators: [Validators.required] }),
    });
  }

  createEntity(){
    if(entityType==="classes"){
      // constructo group object
      let newClass : Class = {
        _id: null,
        creatorId: "backend",
        className: this.form.value.name,
        description: this.form.value.description,
        membersId: [],
      }

      this.mainService.createEntity("classes", newClass)
    }

    if(entityType==="groupes"){

      let newGroup : Group = {
        _id: null,
        creatorId: "backend",
        groupName: this.form.value.name,
        description: this.form.value.description,
        membersId: [],
      }

       this.mainService.createEntity("groups", newGroup)
    }
    this.form.reset();
  }

  

  displayClass(c: Class){
    this.router.navigate(["classes", c.className, c._id]);
  }

}
