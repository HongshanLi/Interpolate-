import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "@app/auth/auth.service";
import { Class } from "@app/models/class.model";
import { environment } from "@env/environment";

@Injectable({providedIn: "root"})
export class ClassesService {

  private apiUrl = environment.apiUrl + "/classes/";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute){}

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
