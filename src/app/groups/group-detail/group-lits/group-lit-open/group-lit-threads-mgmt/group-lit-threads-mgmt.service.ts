//will be heavily used for components communication
// subscribe everything here

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GroupThread } from "@app/models/groupThread.model";
import { environment } from "@env/environment";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupLitThreadsMgmtService {
  private threads : GroupThread[] = [];

  public allThreadsOnThisPageSubject = new Subject<GroupThread[]>();
  public matchedThreadsSubject = new Subject<GroupThread[]>();

  public showThreadCreate = new Subject<boolean>();

  public showThreadUpdate = new Subject<boolean>();
  public showThreadsList = new Subject<boolean>();
  public showThreadsSearch = new Subject<boolean>();

  public pageNumberUpdated = new Subject<boolean>();

  public showSingleThread = new Subject<boolean>();

  public keywordsStr = new Subject<string>();

  private apiUrl = environment.apiUrl + "/groups/threads/";

  constructor(
    private http: HttpClient
  ) { }

  allThreadsOnThisPageObs(){
    return this.allThreadsOnThisPageSubject.asObservable();
  }

  keywordsStrObs(){
    return this.keywordsStr.asObservable();
  }

  matchedThreadsObs(){
    return this.matchedThreadsSubject.asObservable();
  }

  showThreadsSearchObs(){
    return this.showThreadsSearch.asObservable();
  }


  showThreadCreateObs (){
    return this.showThreadCreate.asObservable();
  }

  showThreadUpdateObs (){
    return this.showThreadUpdate.asObservable();
  }

  showThreadsListObs() {
    return this.showThreadsList.asObservable();
  }
  pageNumberUpdatedObs(){
    return this.pageNumberUpdated.asObservable();
  }

  showSingleThreadObs (){
    return this.showSingleThread.asObservable();
  }


  createThread(thread:GroupThread){
    this.http.post(this.apiUrl, thread).subscribe(
      res => {
        this.threads.push(thread);
        this.allThreadsOnThisPageSubject.next(this.threads);
      }
    );
  }



  updateThread(thread:GroupThread){
    this.http.put<{message:string}>(this.apiUrl, thread)
    .subscribe(
      res => {
        let index :number;
        for (let item of this.threads){
          if(item._id==thread._id){
            index = this.threads.indexOf(item);
            break;
          }
        }

        this.threads[index] = thread;
      }
    );
  }

  followThread(threadId:string, following:boolean){
    this.http.put(this.apiUrl + "follow", {
      threadId: threadId,
      following: following
    }).subscribe(
      res => {
        let index: number;
        for (let item of this.threads){
          if(item._id == threadId){
            index = this.threads.indexOf(item);
            break;
          }
        }

        if(following===true){
          this.threads[index].followedBy.push(localStorage.getItem("userId"));
        } else {
          this.threads[index].followedBy =
          this.threads[index].followedBy.filter(userId => {
            userId != localStorage.getItem("userId");
          });
        }
      }
    );
  }

  addUserToViewedBy(threadId: string){
    this.http.put(this.apiUrl + "addUserToViewedBy", {
      threadId: threadId
    }).subscribe(
      res => {
        return;
      }
    );
  }

  removeUserFromViewedBy(threadId:string){
    this.http.put(this.apiUrl + "removeUserFromViewedBy", {
      threadId: threadId
    }).subscribe(
      res => {

      }
    );
  }

  searchThreads(queryStr, litId){
    const params = new HttpParams()
    .set("groupId", localStorage.getItem("groupId"))
    .set("litId", litId)
    .set("queryStr", queryStr);

    this.http.get<{matchedThreads: GroupThread[]}>(
      this.apiUrl + "search", { params }
    ).subscribe(
      res => {
        this.matchedThreadsSubject.next(res.matchedThreads);
      }
    );
  }


  getAllThreadsOnThisPage(litId:string, pageNumber:number){
    const params = new HttpParams()
    .set("litId", litId)
    .set("pageNumber", pageNumber.toString());

    this.http.get<{message: string, threads: GroupThread[]}>(
        this.apiUrl, { params }
    ).subscribe(
      res => {
        this.threads = res.threads;
        this.allThreadsOnThisPageSubject.next(this.threads);
      }
    );
  }

  deleteThread(thread: GroupThread){
    const params = new HttpParams()
    .set("threadId", thread._id)
    .set("litId", thread.litId)

    this.http.delete<{message:string}>(
      this.apiUrl, { params }
    ).subscribe(
      res => {
        this.threads = this.threads.filter(item => item._id!= thread._id);
        this.allThreadsOnThisPageSubject.next(this.threads);
      }
    );
  }


}
