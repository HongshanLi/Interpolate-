import { Component, OnInit } from '@angular/core';
import { EntityDocumentsService } from
'@app/entity-documents/entity-documents.service';

@Component({
  selector: 'app-update-bottom-sheet',
  templateUrl: './update-bottom-sheet.component.html',
  styleUrls: ['./update-bottom-sheet.component.css'],
})
export class UpdateBottomSheetComponent implements OnInit {

  constructor(
    private docsService: EntityDocumentsService
  ) { }

  ngOnInit() {
    console.log(this.docsService.docToUpdate);
  }

}
