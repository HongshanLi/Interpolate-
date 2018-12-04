import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public isLoading = false;

  public loginFailureMessage : string = "";

  private authListenerSubs: Subscription;
  private pwdResetSent : boolean = false;


  public message:string;

  public showPsdReset:boolean=false;

  // login to join an entity
  public entityType:string;
  public entity:string;
  public entityName:string;
  public entityId:string = null;


  public loginForm: FormGroup;


  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(){

    this.authListenerSubs = this.authService.authStatus
    .subscribe(
      isAuthenticated => {
        console.log(isAuthenticated);

        if(isAuthenticated == false){
          this.loginFailureMessage =
          "Login failed, either email or password is invalid";
        }else{
          console.log(this.entityType);

          if(this.entityType!="my-library"){

            this.router.navigate(["entity", this.entityType, this.entityName, this.entityId]);

          }else{

            this.router.navigate(["my-library"]);

          }

        }
      }
    );


    this.loginForm = new FormGroup({
      identity: new FormControl(null, {
        validators: [Validators.required]
      }),

      password: new FormControl(null, {
        validators: [Validators.required]
      })
    })

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.entityType = paramMap.get("entityType");
        this.entityName = paramMap.get("entityName");
        this.entityId = paramMap.get("entityId");

        if(!this.entityType){
          this.entityType = "my-library";
        }

      }
    );

  }

  onLogin() {


    if(this.entityId){
      this.authService.loginToJoinEntity(
        this.loginForm.value.identity,
        this.loginForm.value.password,
        this.entityType,
        this.entityName,
        this.entityId
      );

    }else{
      this.authService.login(
        this.loginForm.value.identity,
        this.loginForm.value.password,
      );
    }

  }




  navigateToSignUp(){
    this.router.navigate(["/signup"]);
  }

  resetPassword(event: Event){
    const userEmail = (<HTMLInputElement>event.target).value;

    this.authService.passwordReset(userEmail).subscribe(
      res => {
        this.message = res.message;
      },

      error=>{
        this.message = error.error.message;
        console.log("error resetting", error.error.message);
      }
    );
    (<HTMLInputElement>event.target).value = "";
  }

  ngOnDestroy(){
    //this.authListenerSubs.unsubscribe();
  }
}
