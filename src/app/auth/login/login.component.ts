import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router"
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private loginFailureMessage : string = "";

  private authListenerSubs: Subscription;
  private pwdResetSent : boolean = false;

  private invitedGroupId:string;
  private errorMessage :string;
  private resetSuccessful:boolean = false;

  public showPsdReset:boolean=false;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(){
    this.invitedGroupId = this.route.snapshot.params.groupId;
  }

  onLogin(form: NgForm) {

    this.authService.login(
      form.value.identity,
      form.value.password,
      this.invitedGroupId
      );
    // determine if the login if successful
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(
      isAuthenticated => {
        if(isAuthenticated == false){
          this.isLoading = false;
          this.loginFailureMessage = "Login failed, either email or password is invalid";
        }
      }
    );
  }

  navigateToSignUp(){
    this.router.navigate(["/signup"]);
  }

  resetPassword(event: Event){
    const userEmail = (<HTMLInputElement>event.target).value;

    this.authService.passwordReset(userEmail).subscribe(
      response => {
        this.resetSuccessful = true;
        this.errorMessage = "";
        console.log(response);
      },
      error=>{
        this.resetSuccessful = false;
        this.errorMessage = error.error.message;
        console.log("error resetting", error.error.message);
      }
    );
    (<HTMLInputElement>event.target).value = "";
  }

  ngOnDestroy(){
    //this.authListenerSubs.unsubscribe();
  }
}
