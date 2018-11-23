import { Injectable } from '@angular/core';
import { Annotation } from '@app/models/annotation.model'
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "@env/environment";

interface Query  {
  entityType:string,
  entityId:string,
  pageSize:number,
  currentPage: number,
  filterOptions?: string,
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
    totalAnns: number}>();

  private branch: Annotation[]=[];
  public branchUpdated = new Subject<Annotation[]>();

  private apiUrl = environment.apiUrl + "/annotations/"

  constructor(
    private http: HttpClient
  ) { }



  getAnnotations(query: Query){
    const params = new HttpParams()
    .set('entityType', query.entityType)
    .set('entityId', query.entityId)
    .set('pageSize', query.pageSize.toString())
    .set('currentPage', query.currentPage.toString())
    .set('filterOptions',query.filterOptions)



    this.http.get<{annotations: Annotation[], totalAnns:number}>(
      this.apiUrl + 'getAnnotations', {params: params}
    ).subscribe(
      res => {
        this.annList = res.annotations;
        this.totalAnns = res.totalAnns;
        this.annListUpdated.next({
          annotations: [...this.annList],
          totalAnns: this.totalAnns
        });
      }
    )
  }

  setBranch(parentAnn: Annotation){
    const params = new HttpParams()
    .set("entityType", parentAnn.entityType)
    .set("entityId", parentAnn.entityId)
    .set("parent", parentAnn._id)


    this.http.get<{branch: Annotation[]}>
    (this.apiUrl + "setBranch", {params: params}).subscribe(
      res => {
        this.branch = res.branch;
        console.log(this.branch);
        this.branchUpdated.next([...this.branch]);
      }
    );
  }

  createAnnotation(annotation: Annotation){

    this.http.post<{_id:string}>(
      this.apiUrl + 'createAnnotation', annotation
    ).subscribe(
      res => {
        annotation._id = res. _id;
        annotation.isOwner = true;
        annotation.creatorName = localStorage.getItem("userName");

        this.totalAnns = this.totalAnns + 1;

        //if it is a reply
        if(annotation.parent!="root"){
          let parentIndex;

          for(let ann of this.annList){
            if(ann._id == annotation.parent){
              parentIndex = this.annList.indexOf(ann);
              break;
            }
          }

          //this.annList.push(annotation);


          // update branch;
          this.setBranch(this.annList[parentIndex]);
        }else{
          //this.annList.push(annotation);
        }

        this.annList.push(annotation);


        this.annListUpdated.next({
          annotations: [...this.annList],
          totalAnns: this.totalAnns
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

        if(annListIdx!=-1){
          this.annList[annListIdx] = annotation;
        }


        this.branch[branchIdx] = annotation;


        this.annListUpdated.next({
          annotations: [...this.annList],
          totalAnns: this.totalAnns
        });

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

        this.totalAnns = this.totalAnns -1;
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

        this.branchUpdated.next([...this.branch]);




        //update parent annotation children prop
        if(parentIndex > -1){
          let parentAnn = this.annList[parentIndex];
          parentAnn.children = parentAnn.children.filter(
            child => child != annotation._id
          );
          this.annList[parentIndex] = parentAnn;
        }


        this.annListUpdated.next({
          annotations: [...this.annList],
          totalAnns: this.totalAnns});
      }
    );
  }


}
