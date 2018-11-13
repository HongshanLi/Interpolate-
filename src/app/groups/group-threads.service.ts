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

  public showThreadsList = new Subject<boolean>();
  public showThreadsSearch = new Subject<boolean>();

  public showSingleThread = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private groupsService: GroupsService){}




  showSingleThreadObs (){
    return this.showSingleThread.asObservable();
  }


  showThreadsListObs(){
    return this.showThreadsList.asObservable();
  }

  showThreadsSearchObs(){
    return this.showThreadsSearch.asObservable();
  }


  getThreadsForOneGroup(groupId:string){
    let params = new HttpParams()
    .set("groupId", groupId);

    return this.http.get<{message:string, threads:GroupThread[]}>(
      this.apiUrl + "group", { params }
    );
  }



  searchThreads(queryStr: string, groupId:string){
    const params = new HttpParams()
    .set("groupId", groupId)
    .set("queryStr", queryStr);

    return this.http.get<{matchedThreads: GroupThread[]}>(
      this.apiUrl + "searchInGroup", { params }
    );
  }



}
