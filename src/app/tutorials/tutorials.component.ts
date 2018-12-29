import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {

  public panel:string;


  constructor() { }

  ngOnInit() {
  }

  showMyLibrary(){
    this.panel = "myLibrary";
  }

  showGroups(){
    this.panel = "groups";
  }

  showClasses(){
    this.panel = "classes"
  }

}
