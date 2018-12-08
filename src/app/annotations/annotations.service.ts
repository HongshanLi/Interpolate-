import { Injectable } from '@angular/core';
import { Annotation } from '@app/models/annotation.model'
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "@env/environment";



interface Query {
  documentId:string,
  page: number,
}

interface Filter {
  creatorName: string,
  editorName: string,
  documentId: string,
  page: number,
  parent: string,
};

interface QueryObject {
  keywords: string,
  entityType: string,
  entityId:string,

  filter: Filter,
}




@Injectable({
  providedIn: 'root'
})
export class AnnotationsService {
  // All annotations in the entity or document
  private annList : Annotation[]=[];
  private totalAnns: number;
  public annListUpdated = new Subject<{
    annotations: Annotation[],
    getMethod: string}>();

  private branch: Annotation[]=[];
  public branchUpdated = new Subject<Annotation[]>();

  private apiUrl = environment.apiUrl + "/annotations/"

  constructor(
    private http: HttpClient
  ) { }



  getAnnotations(query: Query){

    let params = new HttpParams()
    .set("documentId", query.documentId)
    .set("page", query.page.toString())

    this.http.get<{annotations: Annotation[], totalAnns:number}>(
      this.apiUrl + 'getAnnotations', {params: params}
    ).subscribe(
      res => {

        this.annList = res.annotations;
        this.totalAnns = res.totalAnns;
        this.annListUpdated.next({
          annotations: [...this.annList],
          getMethod: 'regular'
        });
      }
    );
  }

  searchAnnotations(queryObject: QueryObject){


    let params = new HttpParams()
    .set("keywords", queryObject.keywords)
    .set("entityType", queryObject.entityType)
    .set("entityId", queryObject.entityId);


    this.http.get<{annotations: Annotation[], totalAnns:number}>(
      this.apiUrl + 'searchAnnotations', {params: params}
    ).subscribe(
      res => {
        // filter creatorName and editorName at frontEnd
        // those info is not store in db
        // only retrievable via aggregation

        this.annList = res.annotations;

        const filter = queryObject.filter;
        Object.keys(filter).forEach(
          key => {
            if(filter[key]!== null){
              console.log(key, filter[key]);
              this.annList = this.annList.filter(
                item => item[key] == filter[key]
              );
            }
          }
        )


        this.totalAnns = res.totalAnns;
        this.annListUpdated.next({
          annotations: [...this.annList],
          getMethod: "search"
        });
      }
    )


  }

  setBranch(parent: string){
    const params = new HttpParams()
    .set("parent", parent);

    this.http.get<{branch: Annotation[]}>
    (this.apiUrl + "setBranch", {params: params}).subscribe(
      res => {
        this.branch = res.branch;

        console.log("current branch", parent, this.branch);
        this.branchUpdated.next([...this.branch]);
      }
    );
  }

  createAnnotation(annotation: Annotation){

    this.http.post<{_id:string, creatorName: string, docTitle: string}>(
      this.apiUrl + 'createAnnotation', annotation
    ).subscribe(
      res => {
        annotation._id = res. _id;
        annotation.creatorName = res.creatorName;
        annotation.docTitle = res.docTitle;


        //if it is a reply
        if(annotation.parent!="root"){
          //if the annotation is a reply to the current node
          if(annotation.parent === this.branch[0]._id){
            this.branch[0].children.push(annotation._id);
            this.branch.push(annotation);
            this.branchUpdated.next([...this.branch])

          }else {
            // it is the reply to a child node of current
            // branch
            let idx: number;
            for(let ann of this.branch){
              if(ann._id === annotation.parent){
                idx = this.branch.indexOf(ann);
                break;
              }
            }

            this.branch[idx].children.push(annotation._id);
            this.branchUpdated.next([...this.branch]);
          }

        }else{
          this.annList.push(annotation);
        }
        //this.annList.push(annotation);
        this.annListUpdated.next({
          annotations: [...this.annList],
          getMethod: 'regular'
        })

      }
    );
  }

  updateAnnotation(
    annotation: Annotation,
    annListIdx: number,
    branchIdx: number){
    this.http.put<{message: string}>(
      this.apiUrl + 'updateAnnotation', annotation
    ).subscribe(
      res => {
        annotation.lastEditTime = Date.now();
        annotation.editorName = localStorage.getItem("userName");
        this.branch[branchIdx] = annotation;
        this.branchUpdated.next([...this.branch]);
      }
    )
  }

  deleteAnnotation(annotation:Annotation, parentIndex:number){
    // deletion can happen only in a branch

    const params = new HttpParams()
    .set("_id", annotation._id)
    .set("parent", annotation.parent);

    this.http.delete<{message:string}>(
      this.apiUrl + 'deleteAnnotation', {params: params}
    ).subscribe(
      res => {
        this.annList = this.annList.filter(
          ann => ann._id != annotation._id
        );

        // if deleted ann has a parent
        // splice this id from parent.children


        if(this.branch[0]._id == annotation._id){
          this.branch = [];
        } else{
          // update branchNode children
          this.branch[0].children = this.branch[0].
          children.filter(
            _id => _id!=annotation._id
          )
          this.branch = this.branch.filter(
            child => child._id != annotation._id
          );
        }

        //this.annListUpdated.next([...this.annList]);

        this.branchUpdated.next([...this.branch]);
      }
    );
  }


}
