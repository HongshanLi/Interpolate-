import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Document } from "@app/models/document.model";
import { AuthService } from "@app/auth/auth.service";
import { MiscService } from "@app/helpers/misc.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { environment } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private apiUrl = environment.apiUrl + "/myLibrary";
  private lits : Document[];

  public pdfIsReady = new Subject<boolean>();
  public pageNumber = new Subject<number>();

  public highlightsCoord : HighlightCoord[] = [];

  // image data of unhighlighted canvas
  private unHighlightedCanvas: any;

  public inHighlightMode : boolean = false;

  public showAllFiles = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private miscService: MiscService
  ) {}

  pdfIsReadyObs(){
    return this.pdfIsReady.asObservable();
  }


  setPageNumber(pageNumber:string){
    localStorage.setItem("pageNumber", pageNumber);
  }

  getPageNumber(): number {
    let pageNumber : number;
    if(localStorage.getItem("pageNumber")){
      pageNumber = parseInt(localStorage.getItem("pageNumber"),10);
    }else{
      pageNumber = 1;
    }
    return pageNumber;
  }

  pageNumberObs(){
    return this.pageNumber.asObservable();
  }


  showAllFilesObs(){
    return this.showAllFiles.asObservable();
  }


  //get all lits of the group
  getLitsForOneUser(userId:string) {
    let params = new HttpParams()
    .set('userId', userId);
    return this.http.get<{ message: string; lits: Document[]}>
    (this.apiUrl, { params });
  }

  getPdf(litId:string){
    return this.http.get(
      this.apiUrl + litId, {responseType : "arraybuffer"});
  }


  // post lit info
  addLit(lit: Document) {
    return this.http.post<{message: string, uploadTime:number}>
      (this.apiUrl + "/litInfo", lit);
  }

  addFile(litId:string, file:File){
    const fileData = new FormData;
    fileData.append("litId", litId);
    fileData.append("file", file);

    return this.http.post(
      this.apiUrl + "/file", fileData
    );
  }

  // put
  // get the lit information, used to update
  // use id
  getLit(id: string) {
    return this.http.get<{message:string, lit: Document}>(
      this.apiUrl + id
    );
  }

  // update
  updateLit(lit: Document) {
    return this.http.put<{message:string}>(this.apiUrl, lit);
  }


  // delete
  // use id instead litIdentifer
  deleteLit(litId: string){
    // check if there are any threads made on this paper
    let params = new HttpParams()
    .set("litId", litId);
    return this.http.delete(this.apiUrl, { params });
  }

  plotHighlight(coords: HighlightCoord[]){
    let canvas = document.getElementsByTagName("canvas")[0];
    if(canvas && this.unHighlightedCanvas){
      let ctx = canvas.getContext("2d");
      for (let line of coords){
        ctx.beginPath();
        ctx.moveTo(line.initX,line.initY);
        ctx.lineTo(line.finalX, line.initY);
        ctx.strokeStyle = environment.strokeStyle;
        ctx.globalAlpha = environment.globalAlpha;
        ctx.lineWidth = environment.lineWidth;
        ctx.stroke();
      }
      return;
    }else{
      setTimeout(()=>{
        this.plotHighlight(coords);
      },500);
    }
  }

  saveUnhighlightedCanvas(){
    let canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    this.unHighlightedCanvas = context.getImageData(0, 0, canvas.width, canvas.height);
  }

  clearHighlights(){
    this.highlightsCoord = [];
    let destCanv = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    if(destCanv && this.unHighlightedCanvas){
      let ctx = destCanv.getContext("2d");
      ctx.putImageData(this.unHighlightedCanvas, 0, 0);

      return;
    }else {
      setTimeout(()=>{
        this.clearHighlights();
      },500);
    }

  }


  private replaceLit(lit: Document){
    for(let singleLit of this.lits){
      if (singleLit._id === lit._id){
        let index = this.lits.indexOf(singleLit);
        this.lits[index] = lit;
        break;
      }
    }
  }


}
