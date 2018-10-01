// This component is used to update user infomation

import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { UserData } from "../auth/user-data.model";
import { environment } from "../../environments/environment";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  private passwordUpdateForm : FormGroup;
  public showChangePsd:boolean;

  public passwordUpdateSuccessMessage:string = "";
  public passwordUpdateErrorMessage:string = "";

  public successMessage:string;
  public errorMessage:string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      userName: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      affiliation: new FormControl(null, {validators: [Validators.required]}),
      //researchInterests: new FormControl(null, { validators: [Validators.required] })
    });

    this.passwordUpdateForm = new FormGroup({
      currentPassword: new FormControl(null, {validators: [Validators.required]}),
      newPassword: new FormControl(null, {validators: [Validators.required,
        Validators.minLength(environment.passwordMinLength)]}),
      reNewPassword: new FormControl(null, {validators: [Validators.required]}),
    });

    this.authService.fetchUserInfo()
    .subscribe(
      response => {
        console.log(response);

        this.form.setValue({
          firstName: response.firstName,
          lastName: response.lastName,
          userName: response.userName,
          email: response.email,
          affiliation: response.affiliation,
        });
      },
      error =>{
        console.log(error);
      }
    );
  }

  onSaveUpdates(){
    const updatedInfo = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      userName: this.form.value.userName,
      email: this.form.value.email,
      affiliation: this.form.value.affiliation,
    }

    this.authService.updateOneUser(
      updatedInfo
    )
    .subscribe(
      response => {
        this.errorMessage = "";
        this.successMessage ="Updates Successfully Saved!";
        this.authService.setUserName(this.form.value.userName);
      },
      error => {
        this.successMessage="";
        this.errorMessage = error.error.message;
        }
    );
  }

  onClickChangePassword(){
    this.showChangePsd = !this.showChangePsd;
    this.passwordUpdateSuccessMessage = "";
    this.passwordUpdateErrorMessage = "";
  }

  updatePassword(){


    if(this.passwordUpdateForm.get('newPassword').invalid){
      this.passwordUpdateErrorMessage = "A valid password must have at least six characters."
      return;
    }


    const formValue = this.passwordUpdateForm.value;
    if(formValue.newPassword==formValue.reNewPassword){
      this.authService.updatePassword(formValue.currentPassword, formValue.newPassword)
      .subscribe(
        response => {
          this.passwordUpdateErrorMessage = "";
          this.passwordUpdateSuccessMessage = response.message;
          this.passwordUpdateForm.reset();
        },
        error => {
          console.log("pass verification failed", error);
          this.passwordUpdateSuccessMessage = "";
          this.passwordUpdateErrorMessage = error.error.message;
        }
      );
    }else{
      this.passwordUpdateSuccessMessage ="";
      this.passwordUpdateErrorMessage = "Re-typed password does not match the new password";
    }
  }
}
