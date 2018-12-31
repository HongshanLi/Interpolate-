import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Document } from "@app/models/document.model";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntityDocumentsService {
  private apiUrl = environment.apiUrl + "/documents";

  public docsUpdatedSub = new Subject<Document[]>();
  public docInfoUpdated = new Subject<{
    documentId: string,
    documentTitle: string}>();

  public closeDoc = new Subject<string>();


  private docsInEntity: Document[]=[];



  constructor(
    private http: HttpClient
  ) { }



  docsUpdatedObs(){
    return this.docsUpdatedSub.asObservable();
  }

  getEntityDocuments(entityType:string, entityId?:string){
    const params = new HttpParams()
    .set("entityId", entityId)
    .set("entityType", entityType);

    this.http.get<{docs:Document[]}>(
      this.apiUrl + '/getEntityDocuments',
      {params: params}
    ).subscribe(
      res => {
        this.docsInEntity = res.docs;
        this.docsUpdatedSub.next([...this.docsInEntity]);
      }
    );
  }

  getDocById(docId:string){
    const params = new HttpParams()
    .set("_id", docId);
    const apiUrl = this.apiUrl + "/file";

    return this.http.get(apiUrl, {
      params: params,
      responseType: "arraybuffer"
    });
  }


  saveDocInfo(docInfo:Document, file:File){
    let realDocInfo:Document;

    this.http.post<{docInfo:Document}>(
      this.apiUrl + "/saveDocInfo", docInfo
    ).subscribe(
      res => {
        realDocInfo = res.docInfo;

        this.uploadDoc(
          realDocInfo.entityType,
          realDocInfo._id,
          file
        ).subscribe(
          res => {
            this.docsInEntity.push(realDocInfo);
            this.docsUpdatedSub.next([...this.docsInEntity]);
          }
        );
      }
    );
  }


  uploadDoc(entityType:string, fileId:string, file:File){
    let fileData = new FormData;
    fileData.append("entityType", entityType);
    fileData.append("fileId", fileId)
    fileData.append("file", file);

    return this.http.post<{message:string}>(
      this.apiUrl + "/uploadDoc", fileData
    );
  }

  updateDoc(updatedDoc: Document){
    //index: index of the document in docsInEntity
    this.http.put<{message: string}>(
      this.apiUrl + "/updateDoc", updatedDoc
    ).subscribe(
      res => {
        this.docInfoUpdated.next({
          documentId: updatedDoc._id,
          documentTitle: updatedDoc.title,
        })
      }
    )
  }

  deleteDoc(docInfo: Document){
    let params = new HttpParams()
    .set("_id", docInfo._id)
    .set("entityType", docInfo.entityType)

    this.http.delete<{message:string}>
    (this.apiUrl + "/deleteDoc", { params: params })
    .subscribe(
      res => {
        this.docsInEntity = this.docsInEntity.filter(
          doc => doc._id !== docInfo._id
        );

        this.docsUpdatedSub.next([...this.docsInEntity]);
      }
    );
  }


}
