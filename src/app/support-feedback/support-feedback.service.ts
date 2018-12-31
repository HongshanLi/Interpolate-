import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Ticket } from "@app/models/ticket.model";
import { environment } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class SupportFeedbackService {

  private apiUrl = environment.apiUrl + "/tickets/"
  constructor(
    private http: HttpClient
  ) { }

  createTicket(ticket: Ticket){
    return this.http.post<{message: string}>(
      this.apiUrl + "createTicket", ticket
    );
  }

}
