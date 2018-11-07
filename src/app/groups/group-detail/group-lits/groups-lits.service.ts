import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { GroupsService } from "@app/groups/groups.service";
import { GroupPaper } from "@app/models/groupPaper.model";
import { Document } from "@app/models/document.model";

import { AuthService } from "@app/auth/auth.service";
import { MiscService } from "@app/helpers/misc.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { environment } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class GroupsLitsService {

  private apiUrl = environment.apiUrl + "/groups/lits/";
  private lits : GroupPaper[];

  public pdfIsReady = new Subject<boolean>();

  public pageNumber = new Subject<number>();

  public highlightsCoord : HighlightCoord[] = [];

  // image data of unhighlighted canvas
  private unHighlightedCanvas: any;

  public inHighlightMode : boolean = false;

  public showAllFiles = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private groupsService: GroupsService,
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
  getLitsForOneGroup(groupId:string) {
    let params = new HttpParams()
    .set('groupId', groupId);
    return this.http.get<{ message: string; lits: GroupPaper[]}>
    (this.apiUrl, { params });
  }

  getPdf(litId:string){
    return this.http.get(
      this.apiUrl + litId, {responseType : "arraybuffer"});
  }


  //add lit from My Library
  addLitFromMyLibrary(lit: GroupPaper) {
    return this.http.post<{message:string, litId:string}>(
      this.apiUrl + "addLitFromMyLibrary", lit
    );
  }


  // post lit info

  addFile(litId:string, file:File){
    const fileData = new FormData();
    fileData.append("litId", litId);
    fileData.append("file", file);

    return this.http.post<{message:string}>(
      this.apiUrl + "file", fileData
    );
  }

  addLit(litInfo:GroupPaper) {
    return this.http.post<{message:string, litId:string}>(
      this.apiUrl, litInfo
    );
  }

  // put
  // get the lit information, used to update
  // use id
  getLit(id: string) {
    return this.http.get<{message:string, lit: GroupPaper}>(
      this.apiUrl + id
    );
  }

  // update
  updateLit(lit: GroupPaper) {
    return this.http.put<{message:string}>(this.apiUrl, lit);
  }


  // delete
  // use id instead litIdentifer
  deleteLit(litId: string){
    // check if there are any threads made on this paper
    let params = new HttpParams()
    .set("litId", litId)
    return this.http.delete<{message: string}>
    (this.apiUrl, { params });
  }



  plotHighlight(coords: HighlightCoord[]){



    try{
      let canvas = document.getElementsByTagName("canvas")[0];
      let ctx = canvas.getContext("2d");

      setTimeout(() => {
        for (let line of coords){
          ctx.beginPath();
          ctx.moveTo(line.initX,line.initY);
          ctx.lineTo(line.finalX, line.initY);
          ctx.strokeStyle = environment.strokeStyle;
          ctx.globalAlpha = environment.globalAlpha;
          ctx.lineWidth = environment.lineWidth;
          ctx.stroke();
        }
      }, 500);

    }catch (error){
      console.log(error)
      setTimeout(()=>{
        this.plotHighlight(coords);
      }, 500);
    }
  }


  /*
  plotHighlight(coords: HighlightCoord[]){
    let canvas = document.getElementsByTagName("canvas")[0];
    let ctx = canvas.getContext("2d");
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    //ctx.putImageData(this.unHighlightedCanvas, 0, 0);

    setTimeout(()=>{
      for (let line of coords){
        ctx.beginPath();
        ctx.moveTo(line.initX,line.initY);
        ctx.lineTo(line.finalX, line.initY);
        ctx.strokeStyle = environment.strokeStyle;
        ctx.globalAlpha = environment.globalAlpha;
        ctx.lineWidth = environment.lineWidth;
        ctx.stroke();
      }
    });
  }
  */

  saveUnhighlightedCanvas(){
    let canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    this.unHighlightedCanvas = context.getImageData(0, 0, canvas.width, canvas.height);
    this.pdfIsReady.next(true);
  }

  clearHighlights(){
    this.highlightsCoord = [];
    let destCanv = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;

    let ctx = destCanv.getContext("2d");
    ctx.putImageData(this.unHighlightedCanvas, 0, 0);

    /*
    if(destCanv && this.unHighlightedCanvas){
      let ctx = destCanv.getContext("2d");
      ctx.putImageData(this.unHighlightedCanvas, 0, 0);

      return;
    }else {
      setTimeout(()=>{
        this.clearHighlights();
      },500);
    }
    */
  }


  private replaceLit(lit: GroupPaper){
    for(let singleLit of this.lits){
      if (singleLit._id === lit._id){
        let index = this.lits.indexOf(singleLit);
        this.lits[index] = lit;
        break;
      }
    }
  }

  private formatAuthors(authors: string){
    // Convert the authors as string into an array
    let authorsArray = authors.split(",");
    //trim the spaces at the begining and the end of each author
    let trimmedAuthors = [];
    for (let author of authorsArray){
      author = author.trim();
      trimmedAuthors.push(author);
    }

    let formattedAuthors = trimmedAuthors.toString();
    return formattedAuthors;
   }


}
