import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassesService } from "./classes.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Class } from "@app/models/class.model";


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  public myClasses : Class[] = [];
  public form: FormGroup;


  constructor(
    private classesService: ClassesService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {

    this.classesService.getMyClasses().subscribe(
      response => {
        this.myClasses = response.classes;
      }
    );


    this.form = new FormGroup({
      className: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null,
        { validators: [Validators.required] }),
    });
  }



  onCreateClass() {
    let membersArray:string[] = [
      localStorage.getItem("userId")
    ];

    // constructo group object
    let newClass : Class = {
      _id: null,
      creatorId: localStorage.getItem("userId"),

      className: this.form.value.className,
      description: this.form.value.description,
      membersId: membersArray,
    }

    this.classesService.createClass(newClass)
    .subscribe(
      response => {
        newClass._id = response.classId;
        this.form.reset();
        this.myClasses.push(newClass);
      },
      error => {
        console.log(error);
      }
    );
  }

  displayClass(c: Class){
    this.router.navigate(["classes", c.className, c._id]);
  }

}
