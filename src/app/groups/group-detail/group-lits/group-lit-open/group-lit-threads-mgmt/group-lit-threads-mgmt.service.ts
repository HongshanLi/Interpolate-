//will be heavily used for components communication
// subscribe everything here

import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { GroupThread } from "@app/models/groupThread.model";
import { environment } from "@env/environment";
import { Subject } from "rxjs";
import { GroupsLitsService } from "@app/groups/group-detail/group-lits/groups-lits.service";

@Injectable({
  providedIn: 'root'
})
export class GroupLitThreadsMgmtService {
  public threads : GroupThread[] = [];

  public allThreadsOnThisPageSubject = new Subject<{threads: GroupThread[],
    totalThreads:number}>();

  public matchedThreadsSubject = new Subject<GroupThread[]>();

  public showThreadCreate = new Subject<boolean>();

  public showThreadUpdate = new Subject<boolean>();
  public showThreadsList = new Subject<boolean>();
  public showThreadsSearch = new Subject<boolean>();

  public pageNumberUpdated = new Subject<boolean>();
  public showSingleThread = new Subject<boolean>();

  private apiUrl = environment.apiUrl + "/groups/threads/";


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private litsService: GroupsLitsService
  ) { }


  allThreadsOnThisPageObs(){
    return this.allThreadsOnThisPageSubject.asObservable();
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
    this.http.post<{message:string, threadId:string}>
    (this.apiUrl, thread).subscribe(
      res => {
        thread._id = res.threadId;
        this.threads.push(thread);
        //this.allThreadsOnThisPageSubject.next(this.threads);

        localStorage.setItem(
          "threadToDisplay",
          JSON.stringify(thread)
        );

        const groupName = localStorage.getItem("groupName");


        this.router.navigate(["groups", groupName, thread.groupId, thread.litId, "view"]);
        this.litsService.plotHighlight(
          thread.highlightsCoord
        );

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
        localStorage.setItem("threadToDisplay", JSON.stringify(thread));

        this.threads[index] = thread;
        //this.allThreadsOnThisPageSubject.next(this.threads);

        const groupName = localStorage.getItem("groupName")
        this.router.navigate(["groups", groupName, thread.groupId, thread.litId, "view"]);


        this.litsService.clearHighlights();
        this.litsService.plotHighlight(
          thread.highlightsCoord
        );
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

  searchThreads(queryStr, litId, groupId){
    const params = new HttpParams()
    .set("litId", litId)
    .set("queryStr", queryStr)
    .set("groupId", groupId)

    this.http.get<{matchedThreads: GroupThread[]}>(
      this.apiUrl + "searchInDoc", { params }
    ).subscribe(
      res => {
        this.matchedThreadsSubject.next([...res.matchedThreads]);
      }
    );
  }

  getOneThread(threadId:string){
    const params = new HttpParams()
    .set("threadId", threadId);

    return this.http.get<{thread: GroupThread}>(
      this.apiUrl + "getOneThread", { params }
    );
  }

  getAllThreadsOnThisPage(
    litId:string,
    pageNumber:string,
    pageSize:string,
    currentPage: string){

    const params = new HttpParams()
    .set("litId", litId)
    .set("pageNumber", pageNumber)
    .set("pageSize", pageSize)
    .set("currentPage", currentPage)

    this.http.get<{message: string, threads: GroupThread[], totalThreads:number}>(
        this.apiUrl, { params }
    ).subscribe(
      res => {
        this.threads = res.threads;
        this.allThreadsOnThisPageSubject.next({
          threads: [...this.threads],
          totalThreads: res.totalThreads});
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
        //this.allThreadsOnThisPageSubject.next(this.threads);

        const groupName = localStorage.getItem("groupName");

        this.router.navigate(["/groups", groupName, thread.groupId, thread.litId]);

        this.litsService.clearHighlights();
      }
    );
  }


}
