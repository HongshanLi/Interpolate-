import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {HeaderService} from './/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userIsAuthenticated = false;
  public activity: string[] = [];
  public userId: string[] = [];
  public documentID: string[] = [];
  public date_time: number[] = [];
  private authListenerSubs: Subscription;
  private activitySUB: Subscription;
  private userIdSUB: Subscription;
  private documentIDSUB: Subscription;
  private date_timeSUB: Subscription;


  constructor(private authService: AuthService,
              private headerService: HeaderService,
              private router: Router) {
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.authStatus
      .subscribe(
        isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        });
    this.activitySUB = this.headerService.activityOBS.subscribe(res => this.activity = res);
    this.userIdSUB = this.headerService.userIdOBS.subscribe(res => {
      this.userId = res;
      for (let i = 0; i < this.userId.length; i++) {
        console.log('get userID from service');
        console.log(this.userId[i]);
      }
    });
    this.documentIDSUB = this.headerService.documentIDOBS.subscribe(res => {
      this.documentID = res;
      for (let i = 0; i < this.documentID.length ; i++) {
        console.log('get documentID from service');
        console.log(this.documentID[i]);
      }
    });
    this.date_timeSUB = this.headerService.date_timeOBS.subscribe(res => {
      this.date_time = res;
      for (let i = 0; i < this.date_time.length ; i++) {
        console.log('get date_time from service');
        console.log(this.date_time[i]);
      }
    });
  }


  logout() {
    this.authService.logout();
  }
  getActivityType() {
    this.headerService.getActivityType();
    console.log('get activity from service');
  }
  navigateToSF() {
    this.router.navigate(['/support-feedbacks']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToClasses() {
    this.router.navigate(['/entity/classes']);
  }

  navigateToGroups() {
    this.router.navigate(['/entity/groups']);
  }


  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  navigateToMyLibrary() {
    this.router.navigate(['my-library']);
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
