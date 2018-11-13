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

}
