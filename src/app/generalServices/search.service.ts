import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GroupThread } from "@app/models/groupThread.model";
import { environment } from "@env/environment";
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  searchGroupThreads(queryStr: string, litId:string=null){
    const apiUrl = this.apiUrl + '/groups/threads/search';
    const params = new HttpParams()
    .set("queryStr", queryStr)
    .set("litId", litId);

    return this.http.get<{threads: GroupThread[]}>(
      apiUrl, { params }
    );
  }
}
