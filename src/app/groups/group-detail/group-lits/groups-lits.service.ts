import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { GroupsService } from "@app/groups/groups.service";
import { GroupPaper } from "@app/models/groupPaper.model";
import { AuthService } from "@app/auth/auth.service";
import { MiscService } from "@app/helpers/misc.service";
import { HighlightCoord } from "@app/models/highlightCoord";
import { environment } from "@env/environment";


interface CompletionCallback {
  (error: Error, completed?: boolean):void;
}

@Injectable({
  providedIn: 'root'
})
export class GroupsLitsService {

  private apiUrl = environment.apiUrl + "/" + "groups" + "/" + "lits/";
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


  // post lit info
  addLit(_id:string, title: string, authors: string, file: File) {
    // get userId

    let userName = this.authService.getUserName();
    // get groupId
    let groupId = this.groupsService.getGroupId();
    groupId = groupId.toString();
    let formattedAuthors = this.formatAuthors(authors);
    const litData = new FormData();
    litData.append("_id", _id);
    litData.append("title", title);
    litData.append("authors", formattedAuthors);
    litData.append("userName", userName);
    litData.append("groupId", groupId);
    // add uploadTimn in the backend
    // add threadCount in the backend;

    // put the file as the last item in the data payload
    // any property after "file" will not be recogonized by multer
    litData.append("file", file);
    return this.http.post<{message: string, uploadTime:number}>
    (this.apiUrl, litData);
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
  deleteLit(id: string){
    // check if there are any threads made on this paper
    let params = new HttpParams()
    .set("userName", this.authService.getUserName());
    return this.http.delete<{message: string}>(this.apiUrl + id, { params });
  }

  plotHighlight(coords: HighlightCoord[]){
    let canvas = document.getElementsByTagName("canvas")[0];
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
  }

  saveUnhighlightedCanvas(){
    let canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    this.unHighlightedCanvas = context.getImageData(0, 0, canvas.width, canvas.height);
  }

  clearHighlights(){
    this.highlightsCoord = [];
    let destCanv = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    let ctx = destCanv.getContext("2d");
    ctx.putImageData(this.unHighlightedCanvas, 0, 0);

    /*
    (ctx)
      ? callback(null, true)
      : callback(new Error("failed to clear highlight"))
    ;
    */
  }

  clearHighlightsiWithCallback(callback: CompletionCallback){
    let destCanv = document.getElementsByTagName("canvas")[0];
    let ctx = destCanv.getContext("2d");
    ctx.putImageData(this.unHighlightedCanvas, 0, 0);


    (ctx)
      ? callback(null, true)
      : callback(new Error("failed to clear highlight"))
    ;

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
