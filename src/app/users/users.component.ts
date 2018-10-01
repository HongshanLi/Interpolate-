import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users = [];
  public errorMessage :string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  searchUser(event: Event){
    const queryStr = (<HTMLInputElement>event.target).value;
    this.authService.searchUser(queryStr).subscribe(
      response => {
        this.users = response.results;
        if(this.users.length==0){
          this.errorMessage = "No results found that matches " + queryStr;
        }else{
          this.errorMessage = "";
        }
      }
    );

    (<HTMLInputElement>event.target).value ="";

  }

}
