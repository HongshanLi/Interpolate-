// make this component a child component of doc-display
// page number only goes from doc-display to


import {
  Component, OnInit, OnChanges, ViewChild, ElementRef,
  SimpleChanges, Input, Output, EventEmitter
} from '@angular/core';
import {PageEvent} from '@angular/material';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Annotation} from '@app/models/annotation.model';
import {HighlightCoord} from '@app/models/highlightCoord';
import {AnnotationsService} from './annotations.service';
import {Subscription} from 'rxjs';
import {CommunicationService} from '@app/communication.service';
import {EntityDocumentsService} from '@app/entity-documents/entity-documents.service';
import {environment} from '@env/environment';
import {MatTabChangeEvent} from '@angular/material';

import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';


import {PDFJSStatic, PDFDocumentProxy, PDFPromise} from 'pdfjs-dist';
// then import the actual library using require() instead of import
const pdfjs = require('pdfjs-dist');
// @reference: https://github.com/mozilla/pdf.js/issues/7909
pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/build/pdf.worker.js';


interface Query {
  documentId: string;
  page: number;
}

interface Filter {
  creatorName: string;
  editorName: string;
  documentId: string;
  page: number;
  parent: string;
}

interface SearchQuery {
  keywords: string;
  entityType: string;
  entityId: string;
  filter: Filter;
}

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit, OnChanges,OnDestroy {
  @Output() displayFullDoc: EventEmitter<boolean> = new EventEmitter;

  // ownership
  public userName: string;
  // document page
  @Input() page: number;
  @Input() documentTitle: string;
  @Input() documentId: string;
  @Input() documentUrl: string; // url of pdf document

  @Input() nodeAnnotationId: string;

  @ViewChild('pdfDisplay') pdfDisplay: ElementRef;


  private entityType: string;
  private entityId: string;
  public entity: string;

  private getQuery: Query;

  public annCreate: FormGroup;
  public annUpdate: FormGroup;

  private sub: Subscription;

  // all annotations in the entity or document
  // from the service
  public annList: Annotation[] = [];
  public getMethod = 'regular';

  public branch: Annotation[] = [];

  public selectedIndex = 0;

  // pagination
  public totalAnns: number;
  public pageSize = 10;
  public currentPage = 1;


  // create ann
  public showAnnCreateForm = false;
  public inHighlightMode = false;
  private highlightsCoord: HighlightCoord[] = [];
  public textareaRows = 10;


  public mode = 'create';
  public showAnnUpdateForm = false;
  private highlightDisplayed = false;

  // filter and search
  public message: string;
  public keywordsStr = '';

  // document
  private scale = 1.2; // viewpoint scale;
  public maxPage: number;
  // highlight
  private initX: number;
  private initY: number;
  private finalX: number;
  private finalY: number;
  private startingPoint: number;
  private mouseDown = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: AnnotationsService,
    private comm: CommunicationService,
    private docsService: EntityDocumentsService,
    private bottomSheet: MatBottomSheet,
  ) {

  }

  ngOnChanges (changes: SimpleChanges) {
    if (!this.page) {
      this.page = 1;
    }

    this.renderPage(this.page);
  }

  ngOnInit() {

    if (!this.page) {
      this.page = 1;
    }

    if (this.nodeAnnotationId) {
      this.mainService.setBranch(this.nodeAnnotationId);
    }

    // pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/build/pdf.worker.js';
    // this.renderPage(this.page)

    this.userName = localStorage.getItem('userName');

    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.entityType = paramMap.get('entityType');
        this.entityId = paramMap.get('entityId');
        if (this.entityType == null) {
          this.entityType = 'my-library';
          this.entityId = 'my-library';
        }
      }
    );

    if (this.entityType === 'classes') {
      this.entity = 'class';
    }

    if (this.entityType === 'groups') {
      this.entity = 'group';
    }

    if (this.entityType === 'my-library') {
      this.entity = 'library';
    }

    this.annCreate = new FormGroup({

      title: new FormControl(null),

      content: new FormControl(null,
        {
          validators: [Validators.required]
        }),
      parent: new FormControl(null),
    });

    this.annUpdate = new FormGroup({
      _id: new FormControl(null, {
        validators: [Validators.required]
      }),

      title: new FormControl(null, {
        validators: []
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),

      highlightsCoord: new FormControl(null),

      parent: new FormControl(null),

      children: new FormControl(null),

      creatorName: new FormControl(null,
        {
          validators: [Validators.required]
        }),

      annListIdx: new FormControl(null,
        {
          validators: [Validators.required]
        }),

      branchIdx: new FormControl(null,
        {
          validators: [Validators.required]
        }),
    });

    this.getRootAnns(this.page);


    this.sub = this.mainService.annListUpdated
      .subscribe(
        res => {
          this.annList = res.annotations;
          this.getMethod = res.getMethod;
        }
      );

    this.sub = this.mainService.branchUpdated
      .subscribe(
        res => {
          this.branch = res;
          console.log('new branch', this.branch);

          this.selectedIndex = 1;
        }
      );

    // dynamically determine number of rows in textarea

  }


  renderPage(page: number) {
    /*
    reference for using pdfjs module
    https://mozilla.github.io/pdf.js/examples/
    */

    pdfjs.getDocument(this.documentUrl).then(
      (pdf: PDFDocumentProxy) => {
        this.maxPage = pdf.numPages;
        pdf.getPage(page).then(
          currentPage => {
            const viewport = currentPage.getViewport(this.scale);


            // let canvas = <HTMLCanvasElement>document.getElementById("the-canvas");
            const canvas = <HTMLCanvasElement>this.pdfDisplay.nativeElement;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport
            };

            currentPage.render(renderContext).then(
              () => {
                // console.log("page rendered")
              }
            );

          }
        );
      }
    );
  }

  displayDocument() {
    this.displayFullDoc.emit(true);
  }

  // document

  toPreviousPage() {
    if (this.page > 1) {
      // this.safeUpdatePage(-1);
      this._beforeUpdatePage();
      this.page--;
      this._afterUpdatePage(this.page);
    }
  }

  toNextPage() {
    if (this.page < this.maxPage) {
      // this.safeUpdatePage(+1);

      this._beforeUpdatePage();

      this.page++;
      this._afterUpdatePage(this.page);
    }
  }

  showTips() {
    this.bottomSheet.open(AnnotationsComponentTipsBottomSheet,
      {
        data: {
          entityType: this.entityType,
          entity: this.entity,
        }
      });
  }

  private _beforeUpdatePage(): void {
    this.highlightDisplayed = false;
    this.inHighlightMode = false;
    this.highlightsCoord = [];
  }

  private _afterUpdatePage(page: number): void {
    this.renderPage(page);
    this.getRootAnns(page);
  }

  navigateTo(event: Event) {

    const navPage = parseInt((<HTMLInputElement>event.target).value, 10);

    if (isNaN(navPage)) {
      // this.router.navigate(["groups", this.groupName, this.groupId, this.litId]);
      return;
    } else {
      this._beforeUpdatePage();

      if (navPage < 1) {
        this.page = 1;


      } else if (navPage > this.maxPage) {
        this.page = this.maxPage;

      } else {
        this.page = navPage;
      }

      this._afterUpdatePage(this.page);

      (<HTMLInputElement>event.target).value = '';
      return;
    }
  }

  clearHighlight() {
    this._beforeUpdatePage();

    this.renderPage(this.page);

    this._setCursorStyle();

    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  mousedown(event: MouseEvent) {
    if (this.inHighlightMode) {
      let totalOffsetX = 0;
      let totalOffsetY = 0;
      let canvasX = 0;
      let canvasY = 0;

      let currentElement = event.target as HTMLCanvasElement;

      do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while (currentElement = (currentElement.offsetParent as HTMLCanvasElement));

      canvasX = event.pageX - totalOffsetX;
      canvasY = event.pageY - totalOffsetY;

      this.initX = canvasX;
      this.initY = canvasY;
      this.startingPoint = canvasX;

      this.mouseDown = true;
    }
  }

  mousemove(event: MouseEvent) {
    if (this.inHighlightMode && this.mouseDown) {
      let totalOffsetX = 0;
      let totalOffsetY = 0;
      let canvasX = 0;
      let canvasY = 0;
      let currentElement = event.target as HTMLCanvasElement;

      do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while (currentElement = (currentElement.offsetParent as HTMLCanvasElement));

      canvasX = event.pageX - totalOffsetX;
      canvasY = event.pageY - totalOffsetY;

      const canvas = event.target as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.moveTo(this.startingPoint, this.initY);
      ctx.lineTo(canvasX, this.initY);
      ctx.strokeStyle = environment.strokeStyle;
      ctx.globalAlpha = environment.globalAlpha;
      ctx.lineWidth = environment.lineWidth;
      ctx.stroke();
      this.startingPoint = canvasX;
    }
  }

  mouseup(event: MouseEvent) {
    if (this.inHighlightMode) {
      let totalOffsetX = 0;
      let totalOffsetY = 0;
      let canvasX = 0;
      let canvasY = 0;
      let currentElement = event.target as HTMLCanvasElement;

      do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while (currentElement = (currentElement.offsetParent as HTMLCanvasElement));

      canvasX = event.pageX - totalOffsetX;
      canvasY = event.pageY - totalOffsetY;

      this.finalX = canvasX;
      this.finalY = canvasY;

      const highlightCoord: HighlightCoord = {
        initX: this.initX,
        initY: this.initY,
        finalX: this.finalX,
      };

      this.highlightsCoord.push(highlightCoord);
      this.mouseDown = false;
    }
  }

  getRootAnns(page: number) {
    this.inHighlightMode = false;
    this.highlightDisplayed = false;
    if (this.showAnnCreateForm || this.showAnnUpdateForm) {
      this.annCreate.reset();
      this.annUpdate.reset();

      this.highlightsCoord = [];
      this.inHighlightMode = false;

      this.showAnnCreateForm = false;
      this.showAnnUpdateForm = false;
    }


    this.getQuery = {
      documentId: this.documentId,
      page: page,
    };

    console.log('getting root annotations', this.getQuery);

    this.mainService.getAnnotations(this.getQuery);
    // this.branch = []
  }

  isNode(ann: Annotation, branch: Annotation[]): boolean {
    if (branch.indexOf(ann) === 0) {
      return true;
    } else {
      return false;
    }
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    // this.selectedIndex = event.index;

    if (event.index === 0 && this.highlightDisplayed) {
      this.clearHighlight();
    }

    if (event.index === 0) {
      this.getQuery = {
        page: this.page,
        documentId: this.documentId
      };

      this.mainService.getAnnotations(this.getQuery);
    }

    // If back to the root annotation panel
    // clean highlight from the current tree
  }

  // pagination

  onChangePagination(pageData: PageEvent) {

    this.pageSize = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    // this.getQuery.pageSize = this.pageSize;
    // this.getQuery.currentPage = this.currentPage;

    // this.mainService.getAnnotations(this.getQuery)

  }

  startNewThread() {
    this.mode = 'create';
    this.showAnnCreateForm = true;
    this.selectedIndex = 0;
    // this.clearHighlight();
  }

  createAnn() {
    if (this.annCreate.invalid) {
      return;
    }

    const annotation: Annotation = {
      _id: null,
      entityType: this.entityType,
      entityId: this.entityId,
      documentId: this.documentId,
      creatorId: null,
      creatorName: this.userName,
      title: this.annCreate.value.title,
      content: this.annCreate.value.content,
      page: this.page,
      highlightsCoord: this.highlightsCoord,
      createTime: Date.now(),
      lastEditTime: null,
      followedBy: [],
      viewedBy: [],
      parent: this.annCreate.value.parent ?
        this.annCreate.value.parent : 'root',
      children: []
    };

    this.mainService.createAnnotation(annotation);

    this.annCreate.reset();

    if (this.inHighlightMode || this.highlightsCoord.length > 0) {
      this.highlightsCoord = [];
      this.inHighlightMode = false;
      this.clearHighlight();
    }

    this.showAnnCreateForm = false;
  }

  updateAnn() {
    if (this.annUpdate.invalid) {
      return;
    }

    const annotation: Annotation = {
      _id: this.annUpdate.value._id,
      entityType: this.entityType,
      entityId: this.entityId,
      documentId: this.documentId,
      creatorId: null,
      creatorName: this.annUpdate.value.creatorName,
      title: this.annUpdate.value.title,
      content: this.annUpdate.value.content,
      page: this.page,
      highlightsCoord: this.annUpdate.value.highlightsCoord,
      createTime: Date.now(),
      lastEditTime: null,
      followedBy: [],
      viewedBy: [],
      parent: this.annUpdate.value.parent ?
        this.annUpdate.value.parent : 'root',
      children: this.annUpdate.value.children,
    };

    this.mainService.updateAnnotation(
      annotation,
      this.annUpdate.value.annListIdx,
      this.annUpdate.value.branchIdx
    );

    this.annUpdate.reset();
    this.highlightsCoord = [];
    this.inHighlightMode = false;
    this.showAnnUpdateForm = false;

  }

  addHighlight(event: Event) {
    this.inHighlightMode = !this.inHighlightMode;
    // const button = event.target;
    this._setCursorStyle();
  }

  private _setCursorStyle() {
    if (this.inHighlightMode) {
      // @Todo change the cursor to brush
      this.pdfDisplay.nativeElement.style.cursor = 'text';
    } else {
      this.pdfDisplay.nativeElement.style.cursor = 'default';
    }
  }

  discard() {
    this.showAnnCreateForm = false;
    this.annCreate.reset();

    this.showAnnUpdateForm = false;
    this.annUpdate.reset();

    if (this.inHighlightMode) {
      this.clearHighlight();
      this.inHighlightMode = false;
      // this.comm.inHighlightMode.next(false);
    }
  }

  viewChildren(annotation: Annotation) {
    this._beforeUpdatePage();
    this.page = annotation.page;

    this.renderPage(this.page);
    this.mainService.setBranch(annotation._id);

  }

  viewParent(annotation: Annotation) {
    this.mainService.setBranch(annotation.parent);
    // this.comm.clearHighlight.next(true);
  }


  timestampToDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toString().split(' ').slice(0, 4).join(' ');
  }

  reply(annotation: Annotation) {
    this.mode = 'reply';

    // this.updateDocIdAndPage(annotation);

    this.annCreate.patchValue({
      parent: annotation._id
    });

    // set current ann to node of a branch
    // this.mainService.setBranch(annotation);
    this.showAnnCreateForm = true;

  }

  edit(annotation: Annotation) {
    // show the highlight of the current annotation
    this.mode = 'edit';
    this.annUpdate.setValue({
      _id: annotation._id,
      title: annotation.title,
      content: annotation.content,
      highlightsCoord: annotation.highlightsCoord,
      parent: annotation.parent,
      children: annotation.children,
      creatorName: annotation.creatorName,
      annListIdx: this.annList.indexOf(annotation),
      branchIdx: this.branch.indexOf(annotation),
    });
    this.showAnnUpdateForm = true;
  }


  showHighlight(annotation: Annotation) {
    this.highlightDisplayed = true;

    const canvas = document.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d');
    for (const line of annotation.highlightsCoord) {
      ctx.beginPath();
      ctx.moveTo(line.initX, line.initY);
      ctx.lineTo(line.finalX, line.initY);
      ctx.strokeStyle = environment.strokeStyle;
      ctx.globalAlpha = environment.globalAlpha;
      ctx.lineWidth = environment.lineWidth;
      ctx.stroke();
    }
  }


  delete(annotation: Annotation) {
    this.mainService.deleteAnnotation(
      annotation,
      this.getParentIndex(annotation)
    );

    if (this.highlightDisplayed) {
      this.clearHighlight();
    }
  }

  private getParentIndex(annotation: Annotation) {
    if (annotation.parent === 'root') {
      return -1;
    } else {
      for (const ann of this.annList) {
        if (ann._id === annotation.parent) {
          return this.annList.indexOf(ann);
          break;
        }
      }
    }
  }

  // filter
  search(event: Event) {

    const query = (<HTMLInputElement>event.target).value.trim();
    if (query === '') {
      this.getQuery = {
        documentId: this.documentId,
        page: this.page,
      };
      this.keywordsStr = '';
      this.mainService.getAnnotations(this.getQuery);
      return;
    }


    let filterStr: string;
    let queryObject: SearchQuery;

    if (query.indexOf('|') > -1) {
      // if there is a pipeline, then get keywords as
      // everything before the pipeline
      const keywords = query.substr(0, query.indexOf('|')).trim();

      if (keywords === '*') {
        this.keywordsStr = '';
      } else {
        this.keywordsStr = keywords;
      }

      filterStr = query.substr(query.indexOf('|') + 1).trim();
      let filter = this.filterParse(filterStr);

      if (filter !== false) {
        filter = filter as Filter;

        queryObject = {
          keywords: keywords,
          entityType: this.entityType,
          entityId: this.entityId,
          filter: filter
        };

      } else {
        this.keywordsStr = '';
        // invalid filter options
        // display error message to users
        return;
      }
    } else {
      // keywords only, no filter options

      if (query === '*') {
        this.keywordsStr = '';
      } else {
        this.keywordsStr = query;
      }

      queryObject = {
        keywords: query,
        entityType: this.entityType,
        entityId: this.entityId,
        filter: {
          creatorName: null,
          editorName: null,
          documentId: this.documentId,
          page: null,
          parent: null,
        }
      };
    }

    this.mainService.searchAnnotations(queryObject);
  }

  private filterParse(filterStr: string): boolean | Filter {
    // return a javascript object
    // get valid options
    const optionList = [
      '--creator-name', '--editor-name',
      '--document', // by default, only document
      '--current-page', // by default all pages
      '--root-only', // by default, all annotations
    ];

    // check if filterStr has any invalid options
    const possibleOptions = [];
    for (const s of filterStr.split(' ')) {
      if (s.startsWith('--')) {
        possibleOptions.push(s);
      }
    }

    const invalidOptions = [];
    for (const op of possibleOptions) {
      if (optionList.indexOf(op) === -1) {
        invalidOptions.push(op);
      }
    }

    if (invalidOptions.length > 0) {
      this.message = invalidOptions[0] + ' is an invalid option.';
      return false;

    } else {
      const filter: Filter = {
        creatorName: null,
        editorName: null,
        documentId: null,
        page: null,
        parent: null,
      };

      for (const op of possibleOptions) {
        if (op === '--creator-name') {
          if (this.valueOf(filterStr, op) !== false) {
            filter['creatorName'] = this.valueOf(filterStr, op) as string;
          } else {
            this.message = 'you need supply a valid value for creatorName';
            return;
          }
        }

        if (op === '--editor-name') {
          if (this.valueOf(filterStr, op) !== false) {
            filter['editorName'] = this.valueOf(filterStr, op) as string;
          } else {
            this.message = 'you need to supply a valid value for editorName';
            return;
          }

        }

        if (op === '--document') {
          filter['documentId'] = this.documentId;
        }

        if (op === '--current-page') {
          filter['page'] = this.page;
          filter['documentId'] = this.documentId;
        }

        if (op === '--root-only') {
          filter['parent'] = 'root';
        }
      }

      this.message = '';

      return filter;

    }

  }

  private valueOf(filterStr: string, option: string): boolean | string {
    const list = filterStr.split(' ');
    const valueIdx = list.indexOf(option) + 1;
    if (list[valueIdx].startsWith('--')) {
      return false;
    } else {
      return list[valueIdx];
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}


@Component({
  // selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'annotations-component-tips-bottom-sheet.html',
})
export class AnnotationsComponentTipsBottomSheet implements OnInit {
  public entityType: string;
  public entity: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<AnnotationsComponentTipsBottomSheet>) {
  }

  ngOnInit() {
    console.log('this data', this.data);
    this.entityType = this.data.entityType;
    this.entity = this.data.entity;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
