
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
  private fileType :string;

  public showUploadForm: boolean = false;

  public uploadForm: FormGroup;
  private updateForm: FormGroup;


  private litToUpdate: Document;
  private groupName:string
  private showDeleteBtn : boolean;


  // boolean to each lit for deciding if a lit can be deleted
  public fileSizeErrorMsg :string;


  //private groupSub: Subscription;
  // only allow creatorName of the group upload files

  public showAllFiles : boolean = true;
  public showMatchedFiles : boolean = false;
  public showUpdateForm :boolean = false;

  public matchedFiles : Document[] = [];

  private subscription : Subscription;

  public keywords:string;

  constructor(
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private groupsService: GroupsService,
    private groupLitsService: GroupsLitsService,
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");

    this.libraryService.getLitsForOneUser(this.userId).subscribe(
      res => {
        this.lits = res.lits;
      }
    );

    this.groupsService.getMyGroups().subscribe(
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
    this.showUpdateForm = false;
  }

  _showUpdateForm(){
    this.showAllFiles = false;
    this.showMatchedFiles = false;
    this.showUpdateForm = true;
  }

  _showMatchedFiles(){
    this.showAllFiles = false;
    this.showMatchedFiles = true;
    this.showUpdateForm = false;
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
        this.fileType = file.type.split("/")[1];
        return;
      }else{
        this.errorMessage = "Only supports PDF, JPEG, PNG format now"
      }
    }

  }

  onUploadFile() {
    const title = this.uploadForm.value.title;
    const authors = this.uploadForm.value.authors;

    const litInfo : Document = {
      _id : null,
      title: title,
      authors: authors,
      userId: this.userId,
      entityType:"libraries",
      entityId: this.userId,
      uploadTime: Date.now(),
      threadsCount : 0,
      fileType: this.fileType
    }

    this.libraryService.addLit(litInfo).subscribe(
      res => {
        litInfo._id = res.litId;

        this.libraryService.addFile(
          litInfo._id,
          litInfo.fileType,
          this.uploadForm.value.file
        ).subscribe(
          res => {
          this.litName = null;
          this.errorMessage = null;
          this.fileSizeErrorMsg = null;

          this.lits.push(litInfo);
          this.uploadForm.reset();
          this.showUploadForm = false;
        });
      }
    )
  }

  search(event: Event){
    this._showMatchedFiles();
    const queryStr = (<HTMLInputElement>event.target).value;
    this.keywords = queryStr;

    this.libraryService.searchLits(
      queryStr
    ).subscribe(
      res => {
        this.matchedFiles = res.matchedFiles
      }
    );
  }


   openLit(lit: Document){
     localStorage.setItem(
       "litInfo", JSON.stringify(lit)
     );

     this.router.navigate([lit._id], {relativeTo: this.route});
   }

   onDelete(lit: Document){
     this.libraryService.deleteLit(lit)
     .subscribe(
       response => {
         let updatedLits = this.lits.filter(item => item._id !== lit._id);
         this.lits = updatedLits;
     });
   }

   onUpdate(lit: Document){
     this.litToUpdate = lit
     this.updateForm.setValue({
       title: lit.title,
       authors: lit.authors
     });

     this._showUpdateForm();
   }

   onSaveUpdates(){
     const lit = this.litToUpdate;

     // construct lit object
     let updatedLit : Document = {
        _id: lit._id,
        title: this.updateForm.value.title,
        authors: this.updateForm.value.authors,
        userId:lit.userId,
        entityType:lit.entityType,
        entityId:lit.entityId,
        uploadTime: lit.uploadTime,
        threadsCount: lit.threadsCount,
        fileType: lit.fileType
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
         this.litToUpdate = null;
         this.updateForm.reset();

         this._showAllFiles();
       }
     );
   }

   addToGroup(lit:Document, groupId:string){

     const groupLit : Document = {
       _id : null,
       title: lit.title,
       authors: lit.authors,
       userId:lit.userId,
       entityType:"groups",
       entityId:groupId,
       uploadTime: Date.now(),
       threadsCount : 0,
       fileType:lit.fileType
     }

     this.groupLitsService.addLit(groupLit).subscribe(
       res => {
         groupLit._id = res.litId;
         this.libraryService.copyFileToGroup(lit._id, groupLit._id)
         .subscribe(
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
