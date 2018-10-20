import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LibraryService } from
"@app/my-library/library.service";
import { Group } from "@app/models/group";
import { Document } from "@app/models/document.model";
import { GroupPaper } from "@app/models/groupPaper.model";

import { mimeType } from "@app/helpers/mime-type.validator";
import { AuthService } from "@app/auth/auth.service";
import { GroupsService } from "@app/groups/groups.service";
import { MiscService } from "@app/helpers/misc.service";
import { GroupsLitsService } from
"@app/groups/group-detail/group-lits/groups-lits.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent implements OnInit {
  public userId:string;
  public userName:string;

  public myGroups = [];

  //uploaded files
  public lits: Document[] = [];

  private isLoading = false;
  //name of the local file to be uploaded
  public litName: string;
  public errorMessage: string;

  public showUploadForm: boolean = false;

  public uploadForm: FormGroup;
  private updateForm: FormGroup;


  private litToUpdateId: string;
  private groupName:string
  private showDeleteBtn : boolean;


  // boolean to each lit for deciding if a lit can be deleted
  public fileSizeErrorMsg :string;


  //private groupSub: Subscription;
  // only allow creatorName of the group upload files

  public showAllFiles : boolean = true;
  public showMatchedFiles : boolean = false;
  public matchedFiles : Document[] = [];

  private subscription : Subscription;

  constructor(
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private groupsService: GroupsService,
    private groupLitsService: GroupsLitsService,
    private miscService: MiscService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");

    this.libraryService.getLitsForOneUser(this.userId).subscribe(
      res => {
        this.lits = res.lits;
      }
    );

    this.groupsService.getMyGroups(this.userName).subscribe(
      res => {
        this.myGroups = res.groups
      }
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

    // get user id, then all papers
  }

  _showUploadForm(){
    this.showUploadForm = !this.showUploadForm;
  }

  _showAllFiles(){
    this.showAllFiles = true;
    this.showMatchedFiles = false;
  }

  _showMatchedFiles(){
    this.showAllFiles = false;
    this.showMatchedFiles = true;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.uploadForm.patchValue({ file: file });
    this.uploadForm.get("file").updateValueAndValidity();



    if(file.size > 10000000){
      this.fileSizeErrorMsg = "Each file should be less than 10MB";
      return;
    }else {
      if(mimeType(file)){
        this.errorMessage = null;
        this.litName = file.name;
        return;
      }else{
        this.errorMessage = "Only supports PDF format now"
      }
    }

  }

  onUploadFile() {
    const _id = this.miscService.createRandomString(20)
    + "@" + this.userId
    const title = this.uploadForm.value.title;
    const authors = this.uploadForm.value.authors.split(",");

    const litInfo : Document = {
      _id : _id,
      title: title,
      authors: authors,
      userName: this.userName,
      userId: this.userId,
      uploadTime: Date.now(),
      threadsCount : 0,
    }
    this.libraryService.addFile(
      litInfo._id,
      this.uploadForm.value.file
    ).subscribe(
        res => {
          this.libraryService.addLit(litInfo).subscribe(
            res => {
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

  search(event: Event){
    // this search happens at front-end;

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


   openLit(lit: Document){
     localStorage.setItem("litId", lit._id);
     localStorage.setItem("litTitle", lit.title);
     this.router.navigate([lit._id], {relativeTo: this.route});
   }

   onDelete(litId: string){
     this.libraryService.deleteLit(litId)
     .subscribe(
       response => {
         let updatedLits = this.lits.filter(lit => lit._id !== litId);
         this.lits = updatedLits;
     });
   }

   onUpdate(lit: Document){
     this.litToUpdateId = lit._id;
     this.updateForm.setValue({
       title: lit.title,
       authors: lit.authors
     });
   }

   onSaveUpdates(lit: Document){
     // construct lit object
     let updatedLit : Document = {
        _id: lit._id,
        title: this.updateForm.value.title,
        authors: this.updateForm.value.authors.split(","),
        userName: lit.userName,
        userId:lit.userId,
        uploadTime: lit.uploadTime,
        threadsCount: lit.threadsCount,
    };

     this.libraryService.updateLit(updatedLit)
     .subscribe(
       response => {
         // replace lit
         let index :number;
         for (let lit of this.lits){
           if(lit._id == updatedLit._id){
             index = this.lits.indexOf(lit);
             this.lits[index]=updatedLit;
             break;
           }
         }
         localStorage.setItem("litTitle", updatedLit.title);
         this.litToUpdateId = null;
         this.updateForm.reset();
       }
     );
   }

   addToGroup(lit:Document, groupId:string){
     const _id = this.miscService.createRandomString(20)
     + "@" + groupId;

     const groupLit : GroupPaper = {
       _id : _id,
       title: lit.title,
       authors: lit.authors,
       userName: lit.userName,
       userId:lit.userId,
       groupId:groupId,
       uploadTime: Date.now(),
       threadsCount : 0,
     }

     this.libraryService.copyFileToGroup(lit._id, groupLit._id)
     .subscribe(
       res => {
         this.groupLitsService.addLit(groupLit).subscribe(
           res => {
             return;
           }
         );
       }
     );
   }





  private timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(" ").slice(0,4).join(" ");
  }

}
