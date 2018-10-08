import { Injectable } from '@angular/core';
import { Response } from '@app/models/response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '@app/auth/auth.service';
import { Subject } from 'rxjs';
//import { GroupThreadsService } from "./group-threads.service";
import { environment } from "@env/environment";

@Injectable({providedIn: "root"})
export class ResponsesService {
  private apiUrl = environment.apiUrl + "/groups/" + "responses/";
  private responses : Response[]=[];

  private allResponses = new Subject<Response[]>();


  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  allResponsesObs(){
    return this.allResponses.asObservable();
  }

  // post
  createResponse(response: Response){
    this.http.post<{message: string}>(this.apiUrl, response)
    .subscribe(
      res => {
        this.responses.push(response);
      }
    );
  }

  // get all responses for one thread
  getAllResponses(threadId:string){
    let params = new HttpParams()
    .set("threadId", threadId);

    this.http.get<{message:string, responses: Response[]}>(
      this.apiUrl, { params }
    ).subscribe(
      res => {
        this.responses = res.responses;
        this.allResponses.next(this.responses);
      }
    );
  }

  // put
  updateResponse(updatedResponse: Response){
    this.http.put<{message: string}>(this.apiUrl, updatedResponse)
    .subscribe(
      res => {
        let index : number;

        for(let response of this.responses){
          if(response._id==updatedResponse._id){
            index = this.responses.indexOf(response);
            this.responses[index]=updatedResponse;
            break;
          }
        }

        this.allResponses.next(this.responses);
      }
    );
  }

  // delete
  deleteResponse(responseId: string, threadId:string){
    return this.http.delete<{message: string}>(
      this.apiUrl + responseId + "/" + threadId);
  }


}
