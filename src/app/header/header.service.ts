import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

// import { AuthData } from './auth-data.model';
// import { UserData } from './user-data.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';




@Injectable({ providedIn: 'root' })

export class HeaderService {
  private activityTypeArray: string[] = [];
  private userId: string[] = [];
  private apiUrl = environment.apiUrl + '/' + 'activity';
 public activityOBS = new Subject<string[]>();
 public userIdOBS = new Subject<string[]>();
 public documentIDOBS = new Subject<string[]>();
 public date_timeOBS  = new  Subject<number[]>();

  constructor(private  http: HttpClient, private router: Router) {

  }

  getActivityType() {
    this.http
      .get<{ activityType_past: string[], userId_past: string[], documentID_past: string[] , date_time_past: number[] }>(
        this.apiUrl + '/findActivityType'
      )
      .subscribe(
        response => {
          this.activityTypeArray = response.activityType_past;
          this.activityOBS.next(response.activityType_past);
          this.userIdOBS.next(response.userId_past);
          this.documentIDOBS.next(response.documentID_past);
          this.date_timeOBS.next(response.date_time_past);
        });
  }
  // @ts-ignore
  //
  //
  // getActivity(): Observable<activity[]> {
  /*
  return Observable.create(activity => {
      activity.next(this.userArray);
      activity.complete();
    });
  }
  */
  // getActivity() {
  //   console.log('begin get activity lo');
  //   this.http
  //     .get<{ activity_past: string[] }>(
  //       this.apiUrl + '/checkActivity'
  //     )
  //     .subscribe(
  //       response => {
  //         this.activity = response.activity_past;
  //         console.log('chushengchusheng');
  //         for (let i = 0; i < this.activity.length; i++) {
  //           console.log(this.activity[i]);
  //         }
  //       });
  // }

}
