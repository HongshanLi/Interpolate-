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
  public threadsSubject = new Subject<GroupThread[]>();

  public showThreadCreate = new Subject<boolean>();

  private apiUrl = environment.apiUrl + "/groups/threads/";

  constructor(
    private http: HttpClient
  ) { }

  threadsObs(){
    return this.threadsSubject.asObservable();
  }

  showThreadCreateObs (){
    return this.showThreadCreate.asObservable();
  }

  createThread(thread:GroupThread){
    this.http.post(this.apiUrl, thread).subscribe(
      res => {
        this.threads.push(thread);
        this.threadsSubject.next(this.threads);
        this.showThreadCreate.next(false);
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
        this.threadsSubject.next(this.threads);
      }
    );
  }


}
