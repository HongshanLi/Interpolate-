import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MiscService } from "@app/helpers/misc.service";
import { environment } from "@env/environment";
import { UserData } from "@app/auth/user-data.model";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  private isLoading = false;
  public errorMessage: string;
  public form: FormGroup;



  private invitedSignUp:boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      userName: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required,
        Validators.minLength(environment.passwordMinLength)]}),
      affiliation: new FormControl(null, {validators: [Validators.required]}),
      //researchInterests: new FormControl(null, {validators: [Validators.required]}),
    });

  }

  loginToJoin(){
    const groupId = this.route.snapshot.params.groupId;
    if(groupId){
      this.router.navigate(["login/", groupId]);
    }else{
      this.router.navigate(["login"]);
    }

  }

  onSignup() {
    if(this.form.invalid){
      return;
    }

    // create user Object
    const userData : UserData = {
      _id: null,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      userName: this.form.value.userName,
      email: this.form.value.email,
      password: this.form.value.password,
      affiliation: this.form.value.affiliation,
    };

    this.authService.checkUserNameAndEmail(
      this.form.value.userName,
      this.form.value.email
    ).subscribe(
      res => {

        if(res.message == "available"){
          this.authService.createUser(userData)
          .subscribe(
            res => {
              this.authService.login(
                this.form.value.userName,
                this.form.value.password
              )
              this.form.reset();

            });
        }else {
          this.errorMessage = res.message
        }


      }
    );
  }
}
