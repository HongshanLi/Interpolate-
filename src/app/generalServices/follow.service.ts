import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GroupThread } from "@app/models/groupThread.model"
@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private apiUrl = environment.apiUrl + "/follows/";

  constructor(
    private http: HttpClient
  ) { }

  followThisGroupThread(threadId:string){
    return this.http.put<{message:string}>(this.apiUrl + "groupThreads", {
      "threadId": threadId
    });
  }

  unfollowThisGroupThread(threadId:string){
    return this.http.put<{message:string}>(
      this.apiUrl + "groupThreads/unfollow", {
        "threadId": threadId
      }
    );
  }

  getFollowingGroupThreads(){
    return this.http.get<{followingThreads: GroupThread[]}>(
      this.apiUrl + "groupThreads"
    );
  }

}
