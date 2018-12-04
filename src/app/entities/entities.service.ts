import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { AuthService } from "@app/auth/auth.service";
import { Class } from "@app/models/class.model";
import { Group } from "@app/models/group.model";

import { environment } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private apiUrl = environment.apiUrl + "/entities/"
  private myEntities = [];
  public myEntitiesUpdated = new Subject<any[]>();

  private selectedEntity: any;
  public selectedEntityUpdated = new Subject<any>();

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



    this.http.get<{entities: any[]}>(
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

    this.http.post<{entity: any}>(
      apiUrl, entity
    ).subscribe(
      res => {
        this.myEntities.push(res.entity);
        this.myEntitiesUpdated.next(this.myEntities)
      }
    );
  }

  getEntityInfo(entityType:string, entityId?:string){
    const params = new HttpParams()
    .set("entityType", entityType)
    .set("entityId", entityId)

    this.http.get<{entity: any}>(
      this.apiUrl + "getEntityInfo", {params: params}
    ).subscribe(
      res => {
        this.selectedEntity = res.entity;
        this.selectedEntityUpdated.next(this.selectedEntity);
      }
    )
  }

}
