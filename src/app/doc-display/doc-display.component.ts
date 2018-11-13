// open and render the file

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { Subscription } from "rxjs";
import { PDFDocumentProxy } from 'pdfjs-dist';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@env/environment";
import { CommunicationService } from "@app/communication.service";

@Component({
  selector: 'app-doc-display',
  templateUrl: './doc-display.component.html',
  styleUrls: ['./doc-display.component.css']
})
export class DocDisplayComponent implements OnInit {
  public documentId: string;

  public documentSrc : any;
  public maxPage: number;
  public size: number;
  public page: number;
  private apiUrl = environment.apiUrl + "/documents/file";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private comm: CommunicationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {

        this.documentId = paramMap.get("documentId")

        this.getDocById(
          this.documentId
        ).subscribe(
          res => {
            this.documentSrc = res;
          }
        );
      }
    );
  }


  // For PDF Document
  getDocById(docId:string){
    const params = new HttpParams()
    .set("_id", docId);

    return this.http.get(this.apiUrl, {
      params: params,
      responseType: "arraybuffer"
    });
  }

  loadComplete(pdf: PDFDocumentProxy){

    this.maxPage = pdf.numPages;

  }


  onPageRendered(event: CustomEvent){
    /*
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if(paramMap.get("annotationId")){
          this.annotationService.getAnnotationById(
            paramMap.get("annotationId")
          ).subscribe(
            res => {
              this.annotationToDisplay = res.annotation;
              this.page = this.annotationToDisplay.page;
            }
          );
        }else{
          this.page = 1;
        }
      }
    );
    */
    this.page = 1;
    this.comm.pageUpdated.next(this.page);

  }


  toPreviousPage(){
    if(this.page > 1){
      //this.router.navigate(["groups", this.groupName, this.groupId, this.litId])
      this.page--;
    }
  }

  toNextPage(){
    if(this.page < this.maxPage){
      //this.router.navigate(["groups", this.groupName, this.groupId, this.litId]);
      this.page++;
    }
  }

  navigateTo(event: Event){
    const navPage = parseInt((<HTMLInputElement>event.target).value, 10);
    if(isNaN(navPage)){
      //this.router.navigate(["groups", this.groupName, this.groupId, this.litId]);
      return;
    }else{
      if(navPage < 1){
        this.page = 1;
        //this.router.navigate(["groups", this.groupName, this.groupId, this.litId]);

      } else if(navPage > this.maxPage){
        this.page = this.maxPage;

      } else{
        this.page = navPage;

      }

      (<HTMLInputElement>event.target).value = "";
      return;
    }
  }

  zoomIn(){
    this.size = this.size + 0.2;
  }

  zoomOut(){
    this.size = this.size - 0.2;
  }


}
