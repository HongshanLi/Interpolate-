import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { AuthService } from "@app/auth/auth.service";
import { Class } from "@app/models/class.model";
import { Group } from "@app/models/group";

import { environment } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private apiUrl = enviornment.apiUrl + "/entities/"

  private myEntities : Class[] | Group[] = [];
  public myEntitiesUpdated = new Subject<Class[] | Group[]>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ){}

  getEntities(entityType:string){
    let apiUrl:string

    if(entityType==="classes"){
      apiUrl = this.apiUrl + "getClasses"
    }
    if(entityType==="groups"){
      apiUrl = this.apiUrl + "getGroups"
    }

    this.http.get<{entities: Class[] | Group[]}>(
      apiUrl
    ).subscribe(
      res => {
        this.myEntities = res.entities;
        this.myEntitiesUpdated.next([...this.myEntities])
      }
    )
  }

  createEntity(entityType: string, entity:Class | Group){
    let apiUrl:string

    if(entityType==="classes"){
      apiUrl = this.apiUrl + "createClass"
    }
    if(entityType==="groups"){
      apiUrl = this.apiUrl + "createGroup"
    }

    this.http.post<{entity: Class | Group}>(
      apiUrl
    ).subscribe(
      res => {
        this.myEntities.push(res.entity);
        this.myEntitiesUpdated.next([...this.myEntities])
      }
    );
  }

}


import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class ClassesService {

  private apiUrl = environment.apiUrl + "/classes/";


  createClass(newClass: Class){
    return this.http.post<{message:string, classId:string}>(
      this.apiUrl, newClass
    );
  }

  getMyClasses(){
    console.log("helo");
    return this.http.get<{message: string, classes: Class[]}>(
      this.apiUrl
    );
  }
}
