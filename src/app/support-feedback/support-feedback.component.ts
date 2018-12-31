import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SupportFeedbackService } from "./support-feedback.service"
import { Ticket } from "@app/models/ticket.model";

@Component({
  selector: 'app-support-feedback',
  templateUrl: './support-feedback.component.html',
  styleUrls: ['./support-feedback.component.css']
})
export class SupportFeedbackComponent implements OnInit {
  public tickets : Ticket[] = [];
  public ticketForm: FormGroup;

  public message: string;

  constructor(
    private mainService: SupportFeedbackService,
  ) { }

  ngOnInit() {

    this.ticketForm = new FormGroup({
      content: new FormControl(null,
      {
        validators: [Validators.required]
      }),

      name: new FormControl (null, {
        validators: [Validators.required]
      }),

      userEmail: new FormControl(null,
      {
        validators: [Validators.required]
      }),
    });

  }

  createTicket(){
    if(this.ticketForm.invalid){
      console.log("Form invalid");
      return;
    }


    const newTicket : Ticket = {
      _id: null,
      content: this.ticketForm.value.content,
      userEmail: this.ticketForm.value.userEmail,
      fullname: this.ticketForm.value.name,
    }

    this.mainService.createTicket(newTicket).subscribe(
      res => {
        this.message = "Thank you creating the support ticket, we will get back" +
        " to you soon!";
        this.ticketForm.reset();
      }
    );
  }

  discard(){
    this.ticketForm.reset();
    this.message = "";
  }

}
