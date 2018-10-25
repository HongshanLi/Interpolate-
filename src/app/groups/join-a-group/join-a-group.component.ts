import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { GroupsService } from "@app/groups/groups.service";
import { AuthService } from "@app/auth/auth.service";
import { Group } from "@app/models/group";
import { UserData } from "@app/auth/user-data.model";
import { environment } from "@env/environment";

@Component({
  selector: 'app-join-a-group',
  templateUrl: './join-a-group.component.html',
  styleUrls: ['./join-a-group.component.css']
})
export class JoinAGroupComponent implements OnInit, OnDestroy {
  public groupName :string;
  public groupToJoin : Group;
  private subscription : Subscription;

  public loginForm : FormGroup;
  public signupForm : FormGroup;

  public loginFailureMessage : string;


    public emailDuplicated: boolean = false;
    public userNameDuplicated: boolean = false;
    private isLoading = false;
    private errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private groupsService: GroupsService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.groupName = paramMap.get("groupName");

        this.groupsService.getOneGroup(
          paramMap.get("groupId")
        ).subscribe(
          res => {
            this.groupToJoin  = res.group;
          }
        );

      }
    );


    this.loginForm = new FormGroup({
      identity: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null,
        { validators: [Validators.required] }),
    });




    this.signupForm = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      userName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null,
        {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null,
        {validators: [
          Validators.required,
          Validators.minLength(environment.passwordMinLength)
        ]}),
      affiliation: new FormControl(null, {validators: [Validators.required]}),
      //researchInterests: new FormControl(null, {validators: [Validators.required]}),
    });



  }

  onLogin() {

    this.authService.login(
      this.loginForm.value.identity,
      this.loginForm.value.password,
      );
    // determine if the login if successful
    this.subscription = this.authService.authStatus
    .subscribe(
      isAuthenticated => {
        if(isAuthenticated == false){
          this.loginFailureMessage =
          "Login failed, either email or password is invalid";
        }else {
          this.groupToJoin.membersId.push(
            localStorage.getItem("userId")
          );

          this.groupsService.updateGroup(
            this.groupToJoin
          ).subscribe(
            res => {
              this.router.navigate(["/groups"]);
            }
          );
        }
      }
    );
  }



  onSignup() {
    if(this.signupForm.invalid){
      return;
    }

    // create user Object
    const userData : UserData = {
      _id: null,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      userName: this.signupForm.value.userName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      affiliation: this.signupForm.value.affiliation,
    };

    this.authService.createUser(userData)
      .subscribe(
        response => {

          this.authService.login(
            userData.userName,
            userData.password
          );

          this.subscription = this.authService.authStatus
          .subscribe(
            isAuthenticated => {
              if(isAuthenticated == false){
                this.loginFailureMessage =
                "Login failed, either email or password is invalid";
              }else {
                this.groupToJoin.membersId.push(
                  localStorage.getItem("userId")
                );

                this.groupsService.updateGroup(
                  this.groupToJoin
                ).subscribe(
                  res => {
                    this.router.navigate(["/groups"]);
                  }
                );
              }
            }
          );

          this.emailDuplicated = false;
          this.userNameDuplicated = false;
        },
        response => {
          this.userNameDuplicated = false;
          this.emailDuplicated = false;
          const error = response.error.error;
          const userNameDup = /expected `userName` to be unique/;
          if(userNameDup.test(error.message)){
            this.userNameDuplicated = true;

            this.signupForm.setValue({
              firstName: this.signupForm.value.firstName,
              lastName: this.signupForm.value.lastName,
              userName: this.signupForm.value.userName,
              password: this.signupForm.value.password,
              email: this.signupForm.value.email,
            });
          }

          const emailDup =  /expected `email` to be unique/;
          if(emailDup.test(error.message)){
            this.emailDuplicated = true;
            this.signupForm.setValue({
              firstName: this.signupForm.value.firstName,
              lastName: this.signupForm.value.lastName,
              userName: this.signupForm.value.userName,
              password: this.signupForm.value.password,
              email: this.signupForm.value.email,
            });
          }
        }
      );
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
