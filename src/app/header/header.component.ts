import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService,
  private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.authStatus
      .subscribe(
        isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }



  logout(){
    this.authService.logout();
  }

  navigateToNewButton(){
    this.router.navigate(["/profile"]);
  }

  navigateToSF(){
    this.router.navigate(["/support-feedbacks"]);
  }
  navigateToHome(){
    this.router.navigate(["/home"]);
  }

  navigateToClasses(){
    this.router.navigate(["/entity/classes"]);
  }

  navigateToGroups(){
    this.router.navigate(["/entity/groups"]);
  }

  navigateToProfile(){
    this.router.navigate(["/profile"]);
  }

  navigateToLogin(){
    this.router.navigate(["/login"]);
  }

  navigateToSignUp(){
    this.router.navigate(["/signup"]);
  }

  navigateToMyLibrary(){
    this.router.navigate(["my-library"])
  }



  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
