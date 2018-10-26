import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GroupsLitsService } from "./groups-lits.service";
import { Group } from "@app/models/group";
import { GroupPaper } from "@app/models/groupPaper.model";
import { Document } from "@app/models/document.model";

import { mimeType } from "@app/helpers/mime-type.validator";
import { AuthService } from "@app/auth/auth.service";
import { GroupsService } from "@app/groups/groups.service";
import { LibraryService } from "@app/my-library/library.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-group-lits',
  templateUrl: './group-lits.component.html',
  styleUrls: ['./group-lits.component.css']
})
export class GroupLitsComponent implements OnInit {
  // group to display
  private group: Group;
  public lits: GroupPaper[] = [];
  public docsInMyLib: Document[]=[];


  private isLoading = false;
  private readyToUpload :boolean = false;
  //name of the local file to be uploaded
  public litName: string;
  public errorMessage: string;

  public showUploadForm: boolean = false;

  public uploadForm: FormGroup;
  private updateForm: FormGroup;


  private litToUpdateId: string;
  private groupName:string
  private showDeleteBtn : boolean;

  private invalidMimeType :boolean = false;

  // boolean to each lit for deciding if a lit can be deleted
  private deletionControl = [];
  public fileSizeErrorMsg :string;


  //private groupSub: Subscription;
  // only allow creatorName of the group upload files
  public userCanUpload = false;

  public showAllFiles : boolean = true;
  public showMatchedFiles : boolean = false;
  public matchedFiles : GroupPaper[] = [];

  private subscription : Subscription;

  constructor(
    private http: HttpClient,
    private libraryService: LibraryService,
    private litsService: GroupsLitsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private groupsService: GroupsService,
  ) {}

  ngOnInit() {

    this.group = JSON.parse(
      localStorage.getItem("activatedGroup")
    );
    // initiate upload form
    this.uploadForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      authors: new FormControl(null, { validators: [Validators.required] }),
      file: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: []
      })
    });

    // initiate update form
    this.updateForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      authors: new FormControl(null, { validators: [Validators.required] })
    });

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        const groupId = paramMap.get('groupId');
        this.litsService.getLitsForOneGroup(groupId).subscribe(
          res => {
            this.lits = res.lits;
          }
        );
      }
    );



    this.subscription = this.litsService.showAllFilesObs()
    .subscribe(
      res => {
        this.showAllFiles = res;
      }
    );

  }


  _showAllFiles(){

    this.showAllFiles = true;
    this.showMatchedFiles = false;
  }

  _showMatchedFiles(){
    this.showAllFiles = false;
    this.showMatchedFiles = true;
  }

  showDocsInMyLib(){
    this.libraryService.getLitsForOneUser(
      localStorage.getItem("userId")
    ).subscribe(
      res => {
        this.docsInMyLib = res.lits
      }
    );
  }

  addLitFromMyLibrary(lit: Document){
    lit.groupId = this.group._id;
    this.litsService.addLitFromMyLibrary(lit)
  }



  /*
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({ file: file });
    this.uploadForm.get("file").updateValueAndValidity();
    if(file.size > 10000000){
      this.fileSizeErrorMsg = "Each file should be less than 10MB."
      this.litName = null;
      return;
    } else{
      this.fileSizeErrorMsg = null;
      //verify mimetype
      if(mimeType(file)){
        this.litName = file.name;
        this.errorMessage = null;
        return;
      }else{
        this.litName = null;
        this.errorMessage = "Only supports PDF format now"
      }
    }
  }

  onUploadFile() {
    let title = this.uploadForm.value.title;
    let authors = this.uploadForm.value.authors.split(",");

    const litInfo : GroupPaper = {
      _id : null,
      title: title,
      authors: authors,
      userName: localStorage.getItem("userName"),
      userId: localStorage.getItem("userId"),
      groupId: localStorage.getItem("groupId"),
      uploadTime: Date.now(),
      threadsCount : 0,
    }

    this.litsService.addLit(litInfo).subscribe(
      res => {
        litInfo._id = res.litId;
        this.litsService.addFile




      }
    )

    this.litsService.addFile(
      litInfo._id,
      this.uploadForm.value.file
    ).subscribe(
        res => {
          this.litsService.addLit(litInfo).subscribe(
            res => {
              litInfo._id = res.litId;

              this.litName = null;
              this.errorMessage = null;
              this.fileSizeErrorMsg = null;

              this.lits.push(litInfo);
              this.uploadForm.reset();
              this.showUploadForm = false;
            }
          );
        }
      );
  }
  */

  search(event: Event){
    this._showMatchedFiles();
    const queryStr = (<HTMLInputElement>event.target).value;
    const reg = new RegExp(queryStr, 'i');
    const indexList = ["title", "author", "userName"];
    let matchedLits = [];
    this.lits.forEach(lit => {
      indexList.forEach(key => {
        if(reg.test(lit[key])){
          matchedLits.push(lit);
        }
      });
    });

    this.matchedFiles = matchedLits;
  }


   openLit(lit: GroupPaper){
     localStorage.setItem("litId", lit._id);
     localStorage.setItem("litTitle", lit.title);
     this.router.navigate([lit._id], {relativeTo: this.route});
   }

   onDelete(litId: string){
     this.litsService.deleteLit(litId)
     .subscribe(
       response => {
         let updatedLits = this.lits.filter(lit => lit._id !== litId);
         this.lits = updatedLits;
     });
   }

   onUpdate(lit: GroupPaper){
     this.litToUpdateId = lit._id;
     this.updateForm.setValue({
       title: lit.title,
       authors: lit.authors
     });
   }

   onSaveUpdates(lit: GroupPaper){
     // construct lit object
     const authors =
     this.updateForm.value.authors.split(",");

     const updatedLit : GroupPaper = {
        _id: lit._id,
        title: this.updateForm.value.title,
        authors:authors,
        userName: lit.userName,
        userId: lit.userId,
        groupId: lit.groupId,
        uploadTime: lit.uploadTime,
        threadsCount: lit.threadsCount,
    };

     this.litsService.updateLit(updatedLit)
     .subscribe(
       response => {
         this.replaceLit(updatedLit);
         localStorage.setItem("litTitle", updatedLit.title);
         this.litToUpdateId = null;
         this.updateForm.reset();
       }
     );
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

    private timestampToDate(timestamp: number) {
      const date = new Date(timestamp);
      return date.toString().split(" ").slice(0,4).join(" ");
    }

}
