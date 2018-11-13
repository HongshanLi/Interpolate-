import { Injectable } from '@angular/core';
import { Annotation } from '@app/models/annotation.model'
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class AnnotationsService {
  // starting points of threads on each page
  private rootAnns : Annotation[]=[];
  public rootAnnsUpdated = new Subject<Annotation[]>();

  // current annotation in view
  public annToDisplay = new Subject<Annotation>();


  // responses to the current annotation in view
  public childAnns: Annotation[]=[];
  public childAnnsUpdated = new Subject<Annotation[]>();

  private apiUrl = environment.apiUrl + "/annotations/"

  constructor(
    private http: HttpClient
  ) { }

  getAnnotations(
    entityType:string,
    entityId:string
    documentId?:string,
    parent?:string){
      const params = new HttpParams()
      .set('entityType', entityType)
      .set('entityId', entityId)
      .set('documentId', documentId)
      .set('parent', parent);

      this.http.get<{annotations: Annotation[]}>(
        this.apiUrl + 'getAnnotations', {params: params}
      ).subscribe(
        res => {
          if(parent){
            this.childAnns = res.annotations;
            this.childAnnsUpdated.next([...this.childAnns]);
          }else{
            this.rootAnns = res.annotations;
            this.rootAnnsUpdated.next([...this.rootAnns]);
          }
        }
      )
    }

    createAnnotation(annotation: Annotation){
      this.http.post<{_id:string}>(
        this.apiUrl + 'createAnnotation', annotation
      ).subscribe(
        res => {
          annotation._id = res. _id;
          if(annotation.parent){
            this.childAnns.push(annotation)
            this.childAnnsUpdated.next([...this.childAnns]);
          }else{
            this.rootAnns.push(annotation);
            this.rootAnnsUpdated.next([...this.rootAnns]);
          }
        }
      );
    }


}
