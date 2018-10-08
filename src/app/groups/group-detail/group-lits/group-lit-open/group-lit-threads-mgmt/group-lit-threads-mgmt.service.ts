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


  public showThreadCreate = new Subject<boolean>();

  public showThreadUpdate = new Subject<boolean>();
  public showThreadsList = new Subject<boolean>();

  public pageNumberUpdated = new Subject<boolean>();

  public showSingleThread = new Subject<boolean>();

  private apiUrl = environment.apiUrl + "/groups/threads/";

  constructor(
    private http: HttpClient
  ) { }

  allThreadsOnThisPageObs(){
    return this.allThreadsOnThisPageSubject.asObservable();
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


  getAllThreadsOnThisPage(litId:string, pageNumber:number){
    let params = new HttpParams()
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

  deleteThread(threadId:string, litId:string){
    //@ToDo work on the backend api
    this.http.delete<{message:string}>(
      this.apiUrl + threadId + "/" + litId
    ).subscribe(
      res => {
        this.threads = this.threads.filter(thread => thread._id!==threadId);
        this.allThreadsOnThisPageSubject.next(this.threads);
      }
    );
  }


}
