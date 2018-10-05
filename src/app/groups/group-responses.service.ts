import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription } from 'rxjs';
import { GroupThreadsService } from "./group-threads.service";
import { environment } from "../../environments/environment";

@Injectable({providedIn: "root"})
export class GroupResponsesService {
  private apiUrl = environment.apiUrl + "/groups/" + "responses/";



  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private threadsService: GroupThreadsService
  ) {}

  // post
  addResponse(response: Response){
    return this.http.post<{message: string}>(this.apiUrl, response);
  }

  // get all responses for one thread
  getResponses(threadId:string){
    let params = new HttpParams()
    .set("threadId", threadId);

    return this.http.get<{message:string, responses: Response[]}>(
      this.apiUrl, { params }
    );
  }

  getResponsesForOneGroup(groupId:string){
    let params = new HttpParams()
    .set("groupId", groupId);

    return this.http.get<{message:string, responses:Response[]}>(
      this.apiUrl + "/group", { params }
    );
  }

  // get one response to update
  getOneResponse(responseId: string){
    return this.http.get<{message:string, response:Response}>(this.apiUrl + responseId);
  }

  // put
  updateResponse(response: Response){
    return this.http.put<{message: string}>(this.apiUrl, response);
  }

  // delete
  deleteResponse(responseId: string, threadId:string){
    return this.http.delete<{message: string}>(
      this.apiUrl + responseId + "/" + threadId);
  }



}
