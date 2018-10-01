import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Group } from "../models/group";
import { environment } from "../../environments/environment";

@Injectable({providedIn: "root"})
export class GroupsService {
  public myGroups : Group[] = [];
  public activatedGroup: Group;

  public groupToDisplay = new Subject<Group>();
  private myGroupsUpdated = new Subject<Group[]>();
  private apiUrl = environment.apiUrl + "/groups/";
  constructor(
    private http: HttpClient,
    private authService: AuthService){}

  getGroupsAtMySchool(){
    return this.http.get<{groups: Group[]}>(
      this.apiUrl + "/myschool"
    );
  }

  setGroupId(groupId:string){
    localStorage.setItem("groupId", groupId);
  }

  setGroupName(groupName:string){
    localStorage.setItem("groupName", groupName);
  }

  getGroupName(){
    localStorage.getItem("groupName");
  }


  getGroupId(){
    return localStorage.getItem("groupId");
  }

  groupToDisplayListener(){
    return this.groupToDisplay.asObservable();
  }

  createGroup(newGroup: Group){
    return this.http.post<{message:string, error:string}>(
      this.apiUrl, newGroup
    );
  }

  getMyGroups(userName:string){
    let queries = new HttpParams().set("userName", userName);
    return this.http.get<{message: string, groups: Group[]}>(
      this.apiUrl, { params: queries }
    );
  }

  getOneGroup(groupId: string){
    console.log("hello world");
    let query = new HttpParams().set("groupId", groupId);
    return this.http.get<{group: Group}>(
      this.apiUrl + "/oneGroup", {params: query}
    );
  }

  updateGroup(updatedGroup: Group){
    return this.http.put<{message:string}>(this.apiUrl, updatedGroup);
  }

  getMyGroupsUpdateListener(){
    return this.myGroupsUpdated.asObservable();
  }

  searchGroup(queryStr:string){
    const params = new HttpParams()
    .set("queryStr", queryStr);

    return this.http.get<{results: any}>(this.apiUrl + "query", { params });
  }

  /*
  deleteGroup(groupId){
    return this.http.delete<{message:string}>(this.apiUrl + groupId);
  }
  */

  invitePeople(groupId:string, groupName: string, fullName:string, email:string){
    return this.http.post<{message:string}>(
      this.apiUrl + "invite", {
        groupId: groupId,
        groupName:groupName,
        fullName: fullName,
        email: email
      }
    );
  }

  private replaceGroup(updatedGroup){
    for (let group of this.myGroups){
      if(group._id == updatedGroup._id){
        let index = this.myGroups.indexOf(updatedGroup);
        this.myGroups[index] = updatedGroup;
        break;
      }
    }
    this.myGroupsUpdated.next([...this.myGroups]);
  }


}
