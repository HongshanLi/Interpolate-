import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/form";
import { ClassesService } from "@app/classes/classes.service";
import { Class } from "@app/models/class.model";
import { Group } from "@app/models/group.model";


@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.css']
})

export class EntityCreateComponent implements OnInit {
  @Input('entityType') entityType :string;

  public form: FormGroup;
  constructor() { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null,
        { validators: [Validators.required] }),
    });

  }



}
