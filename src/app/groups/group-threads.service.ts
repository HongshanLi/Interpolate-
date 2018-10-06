import { GroupThread } from '../models/groupThread.model';
import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { GroupsService } from "./groups.service";
import { environment } from "../../environments/environment";


@Injectable({providedIn: "root"})
export class GroupThreadsService {

  private threads: GroupThread[] = [];
  private apiUrl = environment.apiUrl + "/groups/threads/";
  public threadToDisplay = new Subject<GroupThread>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private groupsService: GroupsService){}


  threadToDisplayObs (){
    return this.threadToDisplay.asObservable();
  }



  getThreadsFrom(litId: string, pageNumber: number){
    let params = new HttpParams()
    .set("litId", litId)
    .set("pageNumber", pageNumber.toString());

    return this.http.get<{message: string, threads: GroupThread[]}>(
        this.apiUrl, { params }
    );
  }

  getThreadsForOneGroup(groupId:string){
    let params = new HttpParams()
    .set("groupId", groupId);

    return this.http.get<{message:string, threads:GroupThread[]}>(
      this.apiUrl + "group", { params }
    );
  }

  checkLitHasThreads(litId:string){
    return this.http.get<{threadsCount:number}>(
      this.apiUrl + litId
    );
  }


  addThread(thread: GroupThread){
    return this.http.post<{message: string, _id:string}>
    (this.apiUrl, thread);
  }


  updateThread(thread:GroupThread){
    return this.http.put<{message:string}>(this.apiUrl, thread);
  }



  deleteThread(threadId: string, litId:string){
    return this.http.delete<{message:string}>(
      this.apiUrl + threadId + "/" + litId);
  }


}
