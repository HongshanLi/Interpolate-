import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "@app/auth/auth.service";
import { Group } from "@app/models/group";
import { environment } from "@env/environment";

@Injectable({providedIn: "root"})
export class GroupsService {
  public myGroups : Group[] = [];
  public activatedGroup :Group;

  private apiUrl = environment.apiUrl + "/groups/";
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute){}


  getGroupId(){
    const group = JSON.parse(
      localStorage.getItem("activatedGroup")
    );
    return group._id;
  }

  createGroup(newGroup: Group){
    return this.http.post<{message:string, groupId:string}>(
      this.apiUrl, newGroup
    );
  }

  getMyGroups(){
    return this.http.get<{message: string, groups: Group[]}>(
      this.apiUrl,
    );
  }

  //get one group to join
  getOneGroup(groupId: string){
    const params = new HttpParams()
    .set("groupId", groupId);

    return this.http.get<{group: Group}>(
      this.apiUrl + "getOneGroup", { params }
    );
  }

  updateGroup(updatedGroup: Group){
    return this.http.put<{message:string}>
    (this.apiUrl, updatedGroup);
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

}
