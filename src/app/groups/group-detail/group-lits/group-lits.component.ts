import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GroupsLitsService } from "./groups-lits.service";
import { Group } from "@app/models/group";
import { GroupPaper } from "@app/models/groupPaper.model";
import { mimeType } from "@app/helpers/mime-type.validator";
import { AuthService } from "@app/auth/auth.service";
import { GroupsService } from "@app/groups/groups.service";
import { MiscService } from "@app/helpers/misc.service";

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
  // only allow creator of the group upload files
  public userCanUpload = false;

  public showAllFiles : boolean = true;
  public showMatchedFiles : boolean = false;
  public matchedFiles : GroupPaper[] = [];

  private subscription : Subscription;

  constructor(
    private http: HttpClient,
    private litsService: GroupsLitsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private groupsService: GroupsService,
    private miscService: MiscService
  ) {}

  ngOnInit() {
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

    /*
    this.groupSub = this.groupsService.groupToDisplayListener().subscribe(
      group => {
        this.group = group;
        if(this.group.creator==this.authService.getUserName()){
          this.userCanUpload = true;
        }
      }
    );
    */

    this.subscription = this.litsService.showAllFilesObs()
    .subscribe(
      res => {
        this.showAllFiles = res;
      }
    )
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
    if(this.uploadForm.get("file").value.size > 10000000){
      this.fileSizeErrorMsg = "Each file should be less than 10MB."
      this.litName = "";
      return;
    } else{
      this.fileSizeErrorMsg = "";
      //verify mimetype
      mimeType(this.uploadForm.get("file")).subscribe(
        result =>{
          if(result.validMimeType){
            this.errorMessage = "";
            this.litName = file.name;
          }else {
            this.litName = "";
            this.errorMessage = "We only support files in pdf format now."
          }
        }
      );
    }
  }

  onUploadFile() {
    let _id = this.miscService.createRandomString(20)
    + "@" + this.groupsService.getGroupId();
    let title = this.uploadForm.value.title;
    let authors = this.formatAuthors(this.uploadForm.value.authors);

    if(this.uploadForm.value.file){
      this.litsService.addLit(_id, title, authors,this.uploadForm.value.file)
      .subscribe(
        response => {
          // update the bookshelfUpdate
          let newPaper : GroupPaper = {
            _id : _id,
            title: title,
            authors: authors,
            userName: this.authService.getUserName(),
            groupId: this.groupsService.getGroupId(),
            uploadTime: response.uploadTime,
            threadsCount : 0,
          };
          this.readyToUpload = false;
          this.lits.push(newPaper);
          this.uploadForm.reset();
          this.litName = "";

        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.errorMessage = "A valid file needs to be selected";
    }
  }

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
     this.litsService.setLitId(lit._id);
     localStorage.setItem("litTitle", lit.title);
     this.router.navigate([lit._id], {relativeTo: this.route});
   }

   onDelete(id: string){
     this.litsService.deleteLit(id)
     .subscribe(
       response => {
         let updatedLits = this.lits.filter(lit => lit._id !== id);
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
     let updatedLit : GroupPaper = {
        _id: lit._id,
        title: this.updateForm.value.title,
        authors: this.formatAuthors(this.updateForm.value.authors),
        userName: lit.userName,
        groupId: lit.groupId,
        uploadTime: lit.uploadTime,
        threadsCount: lit.threadsCount,
    };

     this.litsService.updateLit(updatedLit)
     .subscribe(
       response => {
         console.log(response.message);
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
