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
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if(this.userIsAuthenticated){
          this.router.navigate(['/lits'])
        }
      });
  }

  logout(){
    this.authService.logout();
  }

  navigateToHome(){
    this.router.navigate(["/home"]);
  }

  navigateToGroups(){
    this.router.navigate(["/groups"]);
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
    this.router.navigate(["/my-library"])
  }

  

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
