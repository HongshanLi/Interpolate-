(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/annotations/annotations-component-tips-bottom-sheet.html":
/*!**************************************************************************!*\
  !*** ./src/app/annotations/annotations-component-tips-bottom-sheet.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b>\n  What is an annotation?\n</b>\n\n<p>\n  An annotation is a note of explanation, comment or question\n  added to a text to help us better understand the text itself.\n</p>\n\n<b *ngIf=\"entityType==='my-library'\">\n  What can I do?\n</b>\n\n<p *ngIf=\"entityType==='my-library'\">\n  In <b>My Library</b>, annotations you created are only for yourself.\n  You can highlight the important parts of a document and add explanation\n  or your own interpretation. Or you can highlight the parts of a document\n  that you don't understand very well at the moment and come back to it latter.\n</p>\n\n<b *ngIf=\"entityType!=='my-library'\">\n  In a group or class, annotations you created are shared with every member.\n  You can share your insight to the important part of the text with your peers.\n  Or you can post a question to the part of the text you don't understand.\n  Your question can well be many other people's question. Of course,\n  collective annotating is a community-driven activity,\n  you should also respond to questions posted by other memebers of your\n  group or class.\n</b>\n\n<b>\n  What's new on Interpolate?\n</b>\n\n<p>\n  On Interpolate, not only you can respond to an annotation,\n  you can also respond to an existing response, <i>i.e.</i>\n  you can have a threaded discussion with other members.\n  The very begining of the threaded discussion is called the\n  \"root annotation\".\n</p>\n\n<b>\n  How to create annotation?\n</b>\n<p>\n  Click on \"New Annotation\" button in the toolbar.\n</p>\n"

/***/ }),

/***/ "./src/app/annotations/annotations.component.css":
/*!*******************************************************!*\
  !*** ./src/app/annotations/annotations.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n\n.pdf-display {\n  width: 60%;\n  float:left;\n  overflow:auto;\n} canvas {\n  max-width:200%;\n} hr {\n  border-color:black;\n} mat-card.ann-create-and-update-form{\n  float:right;\n  right:0%;\n  bottom:0%;\n  position:fixed;\n  width:40%;\n  height:60%;\n  z-index:10;\n} mat-form-field{\n  width: 100%;\n} .search-bar {\n  margin-top:5%;\n  width:90%;\n} .example-fill-remaining-space {\n  /* This fills the remaining space, by using flexbox.\n     Every toolbar row uses a flexbox row layout. */\n  flex: 1 1 auto;\n} mat-form-field.page-navigation {\n  width: 100px;\n} mat-tab-group.annotations-display {\n  width: 38%;\n  float:right;\n  margin-right: 2%\n} .content-display-panel {\n  margin-left:2%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYW5ub3RhdGlvbnMvYW5ub3RhdGlvbnMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQTtFQUNFLFdBQVc7RUFDWCxXQUFXO0VBQ1gsY0FBYztDQUNmLENBQUM7RUFDQSxlQUFlO0NBQ2hCLENBRUQ7RUFDRSxtQkFBbUI7Q0FDcEIsQ0FFRDtFQUNFLFlBQVk7RUFDWixTQUFTO0VBQ1QsVUFBVTtFQUNWLGVBQWU7RUFDZixVQUFVO0VBQ1YsV0FBVztFQUNYLFdBQVc7Q0FDWixDQUFDO0VBQ0EsWUFBWTtDQUNiLENBRUQ7RUFDRSxjQUFjO0VBQ2QsVUFBVTtDQUNYLENBRUQ7RUFDRTtvREFDa0Q7RUFDbEQsZUFBZTtDQUNoQixDQUVEO0VBQ0UsYUFBYTtDQUNkLENBRUQ7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtDQUNqQixDQUVEO0VBQ0UsZUFBZTtDQUNoQiIsImZpbGUiOiJzcmMvYXBwL2Fubm90YXRpb25zL2Fubm90YXRpb25zLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4ucGRmLWRpc3BsYXkge1xuICB3aWR0aDogNjAlO1xuICBmbG9hdDpsZWZ0O1xuICBvdmVyZmxvdzphdXRvO1xufSBjYW52YXMge1xuICBtYXgtd2lkdGg6MjAwJTtcbn1cblxuaHIge1xuICBib3JkZXItY29sb3I6YmxhY2s7XG59XG5cbm1hdC1jYXJkLmFubi1jcmVhdGUtYW5kLXVwZGF0ZS1mb3Jte1xuICBmbG9hdDpyaWdodDtcbiAgcmlnaHQ6MCU7XG4gIGJvdHRvbTowJTtcbiAgcG9zaXRpb246Zml4ZWQ7XG4gIHdpZHRoOjQwJTtcbiAgaGVpZ2h0OjYwJTtcbiAgei1pbmRleDoxMDtcbn0gbWF0LWZvcm0tZmllbGR7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uc2VhcmNoLWJhciB7XG4gIG1hcmdpbi10b3A6NSU7XG4gIHdpZHRoOjkwJTtcbn1cblxuLmV4YW1wbGUtZmlsbC1yZW1haW5pbmctc3BhY2Uge1xuICAvKiBUaGlzIGZpbGxzIHRoZSByZW1haW5pbmcgc3BhY2UsIGJ5IHVzaW5nIGZsZXhib3guXG4gICAgIEV2ZXJ5IHRvb2xiYXIgcm93IHVzZXMgYSBmbGV4Ym94IHJvdyBsYXlvdXQuICovXG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG5tYXQtZm9ybS1maWVsZC5wYWdlLW5hdmlnYXRpb24ge1xuICB3aWR0aDogMTAwcHg7XG59XG5cbm1hdC10YWItZ3JvdXAuYW5ub3RhdGlvbnMtZGlzcGxheSB7XG4gIHdpZHRoOiAzOCU7XG4gIGZsb2F0OnJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6IDIlXG59XG5cbi5jb250ZW50LWRpc3BsYXktcGFuZWwge1xuICBtYXJnaW4tbGVmdDoyJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/annotations/annotations.component.html":
/*!********************************************************!*\
  !*** ./src/app/annotations/annotations.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<mat-toolbar>\n  <mat-toolbar-row>\n  <mat-chip-list>\n    <mat-chip>\n      {{ documentTitle }}\n    </mat-chip>\n  </mat-chip-list>\n\n  <button mat-button color=\"primary\"\n  (click)=\"displayDocument()\">\n  View Full Document\n  </button>\n\n  <button mat-button color=\"primary\"\n  (click)=\"toPreviousPage()\">\n    <mat-icon>keyboard_arrow_left</mat-icon>\n  </button>\n\n  <mat-form-field class=\"page-navigation\">\n    <input matInput (keydown.enter)=\"navigateTo($event)\"\n    placeholder=\"{{page}} of {{ maxPage }}\">\n  </mat-form-field>\n\n  <button mat-button color=\"primary\"\n  (click)=\"toNextPage()\">\n    <mat-icon>keyboard_arrow_right</mat-icon>\n  </button>\n\n  <button mat-button  color=\"primary\" selected\n  matTooltip=\"start a new annotation thread\" type=\"button\"\n  (click)=\"startNewThread()\">\n    <mat-icon>add</mat-icon>\n    <span>New Annotation</span>\n  </button>\n\n  <button mat-button  color=\"primary\" selected\n  (click)=\"showTips()\"\n  matTooltip=\"See what you can do\" type=\"button\">\n    <span>Tips</span>\n  </button>\n\n\n  </mat-toolbar-row>\n</mat-toolbar>\n\n\n<div>\n\n<div class=\"pdf-display\">\n  <canvas\n    #pdfDisplay\n    (mousedown)=\"mousedown($event)\"\n    (mousemove)=\"mousemove($event)\"\n    (mouseup)=\"mouseup($event)\"\n  id=\"the-canvas\">\n  </canvas>\n</div>\n\n<mat-tab-group\nclass=\"annotations-display\"\n[(selectedIndex)]=\"selectedIndex\"\n(selectedTabChange)=\"onSelectedTabChange($event)\">\n  <mat-tab label=\"Annotations\">\n\n    <mat-form-field class=\"search-bar\">\n      <input matInput\n      placeholder=\"search and filters annotations created in this document \"\n      (keyup.backspace)=\"search($event)\"\n      (keydown.enter)=\"search($event)\">\n    </mat-form-field>\n\n    <p class=\"text text-info\" *ngIf=\"message\">\n      {{message}}\n    </p>\n\n    <h3 class=\"text text-info\"\n    *ngIf=\"documentId && annList.length==0 && getMethod=='regular'\">\n      No annotations has been created on page {{ page }}\n    </h3>\n\n    <h3 class=\"text text-info\"\n    *ngIf=\"documentId && annList.length>0 && getMethod=='regular'\">\n      Root annotations on page {{ page }}\n    </h3>\n\n\n    <h3 class=\"text text-info\"\n    *ngIf=\"annList.length==0 && getMethod=='search'\">\n      No annotations match your search\n    </h3>\n\n    <div>\n      <div *ngFor=\"let ann of annList\">\n        <a style=\"cursor: pointer\" (click)=\"viewChildren(ann)\">\n          <h4>\n          Annotation created by {{ann.creatorName}} on\n          {{ ann.docTitle }} page {{ ann.page }}\n          </h4>\n        </a>\n        <div>\n          <p mathJax=\"{{ann.title}}\"></p>\n          <p mathJax=\"{{ann.content }}\"></p>\n        </div>\n        <hr>\n      </div>\n    </div>\n\n  </mat-tab>\n\n  <mat-tab label=\"Seleted branch\">\n    <h3 class=\"text text-info\" *ngIf=\"branch.length==0\">\n      No branch is selected\n    </h3>\n\n    <div *ngFor=\"let ann of branch\" [ngStyle]=\"{\n      'margin-left': branch.indexOf(ann)===0? '0': '10px'\n    }\">\n\n      <div id=\"branchElementContent\">\n        <p class=\"text text-info\" *ngIf=\"branch.indexOf(ann)>0\">\n          Response created by {{ ann.creatorName }}\n        </p>\n\n        <p class=\"text text-info\" *ngIf=\"branch.indexOf(ann)===0\">\n          Node of current branch created by {{ ann.creatorName }}\n        </p>\n\n        <p mathJax=\"{{ann.title}}\">\n        </p>\n        <p mathJax=\"{{ann.content}}\">\n        </p>\n      </div>\n\n      <div>\n        <button mat-button color=\"primary\"\n        matTooltip=\"reply this annotation\"\n        (click)=\"reply(ann)\">\n          <mat-icon>reply</mat-icon>\n        </button>\n\n        <button mat-button color=\"primary\"\n        matTooltip=\"edit this annotation\"\n        (click)=\"edit(ann)\">\n          <mat-icon>edit</mat-icon>\n        </button>\n\n        <button mat-button color=\"primary\"\n        *ngIf=\"branch.indexOf(ann)==0 && ann.parent!=='root'\"\n        matTooltip=\"view parent annotation\"\n        (click)=\"viewParent(ann)\">\n          <mat-icon>expand_less</mat-icon>\n        </button>\n\n\n        <button mat-button color=\"primary\"\n        *ngIf=\"branch.indexOf(ann)>0 && ann.children.length > 0\"\n        matBadge=\"{{ ann.children.length }}\" color=\"primary\"\n        matTooltip=\"view children annotations\"\n        (click)=\"viewChildren(ann)\">\n          <mat-icon >\n            expand_more\n          </mat-icon>\n        </button>\n\n        <button mat-button  matTooltip=\"show highlight\"\n          color=\"primary\"\n          *ngIf=\"ann.highlightsCoord.length > 0 && !highlightDisplayed\"\n          (click)=\"showHighlight(ann)\">\n          <mat-icon>highlight</mat-icon>\n        </button >\n\n        <button mat-button  matTooltip=\"clear highlight\"\n          color=\"primary\"\n          *ngIf=\"ann.highlightsCoord.length > 0 && highlightDisplayed\"\n          (click)=\"clearHighlight()\">\n          <mat-icon>refresh</mat-icon>\n        </button >\n\n        <button mat-button color=\"primary\"\n        [matMenuTriggerFor]=\"annInfo\">\n          <mat-icon>info_outline</mat-icon>\n        </button>\n\n        <mat-menu #annInfo=\"matMenu\">\n          <mat-list>\n\n            <mat-list-item>\n              id: {{ ann._id }}\n            </mat-list-item>\n           <mat-list-item>\n             document id: {{ ann.documentId }}\n           </mat-list-item>\n           <mat-list-item>\n             page: {{ ann.page }}\n           </mat-list-item>\n           <mat-list-item>\n             created by: {{ ann.creatorName }}\n           </mat-list-item>\n           <mat-list-item>\n             created on: {{ timestampToDate(ann.createTime) }}\n           </mat-list-item>\n           <mat-list-item *ngIf=\"ann.editorName\">\n             edited by: {{ ann.editorName }}\n           </mat-list-item>\n           <mat-list-item *ngIf=\"ann.lastEditTime\">\n             last edited on: {{ timestampToDate(ann.lastEditTime) }}\n           </mat-list-item>\n           <mat-list-item *ngIf=\"ann.parent!='root'\">\n             parent annotation: {{ ann.parent }}\n           </mat-list-item>\n          </mat-list>\n\n\n\n        </mat-menu>\n\n        <button mat-button color=\"warn\"\n        *ngIf=\"ann.creatorName==userName\n        && ann.children.length==0\"\n        (click)=\"delete(ann)\"\n        matTooltip=\"delete\">\n          <mat-icon>delete</mat-icon>\n        </button>\n      </div>\n      <hr color=\"black\">\n    </div>\n  </mat-tab>\n\n</mat-tab-group>\n</div>\n\n<mat-card class=\"ann-create-and-update-form\" *ngIf=\"showAnnCreateForm\">\n  <b *ngIf=\"mode=='create'\">\n    Creating an annotation on page {{page}} of {{ documentId }}\n  </b>\n\n  <b *ngIf=\"mode=='reply'\">\n    Replying an annotation on page {{page}} of {{ documentId }}\n  </b>\n\n  <form [formGroup]=\"annCreate\">\n    <mat-form-field>\n      <input matInput rows=\"2\" type=\"text\" formControlName=\"title\"\n      placeholder=\"Title (optional) (supports html and latex syntax)\">\n        <!--local reference #title to be parsed to the directive *ngIf -->\n    </mat-form-field>\n\n    <mat-form-field>\n      <textarea matInput appAutoSetRows formControlName=\"content\"\n        placeholder=\"Content (supports html and latex syntax)\">\n      </textarea>\n\n      <mat-error *ngIf=\"annCreate.get('content').invalid\">\n        Please enter some content.\n      </mat-error>\n    </mat-form-field>\n  </form>\n\n  <mat-card-actions>\n    <button mat-button color=\"primary\" (click)=\"createAnn()\">\n      <mat-icon>save</mat-icon>\n    </button>\n\n    <button mat-button\n    [ngStyle]=\"{'background': inHighlightMode==true? '#00b8e6': 'white'}\"\n    color=\"primary\" *ngIf=\"mode==='create'\"\n    (click)=\"addHighlight($event)\"\n    matTooltip=\"add highlgiht\">\n      <mat-icon>brush</mat-icon>\n    </button>\n\n    <button mat-button (click)=\"clearHighlight()\"\n      color=\"primary\" *ngIf=\"mode==='create'\"\n      matTooltip=\"clear highlight\">\n      <mat-icon>refresh</mat-icon>\n    </button>\n\n    <button mat-button color=\"primary\"\n    matTooltip=\"discard\" (click)=\"discard()\">\n      <mat-icon>delete</mat-icon>\n    </button>\n  </mat-card-actions>\n</mat-card>\n\n<mat-card class=\"ann-create-and-update-form\" *ngIf=\"showAnnUpdateForm\">\n  <b>\n    Editing an annotation on page {{page}} of {{ documentId }}\n  </b>\n\n  <form [formGroup]=\"annUpdate\">\n    <mat-form-field>\n      <input matInput rows=\"2\" type=\"text\" formControlName=\"title\"\n      placeholder=\"Title (optional) (supports html and latex syntax)\">\n        <!--local reference #title to be parsed to the directive *ngIf -->\n    </mat-form-field>\n\n    <mat-form-field>\n      <textarea matInput appAutoSetRows formControlName=\"content\"\n        placeholder=\"Content (supports html and latex syntax)\">\n      </textarea>\n\n      <mat-error *ngIf=\"annCreate.get('content').invalid\">\n        Please enter some content.\n      </mat-error>\n    </mat-form-field>\n  </form>\n\n    <mat-card-actions>\n      <button mat-button color=\"primary\" (click)=\"updateAnn()\">\n        <mat-icon>save</mat-icon>\n      </button>\n\n      <button mat-button color=\"primary\"\n      matTooltip=\"discard\" (click)=\"discard()\">\n        <mat-icon>delete</mat-icon>\n      </button>\n\n    </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/annotations/annotations.component.ts":
/*!******************************************************!*\
  !*** ./src/app/annotations/annotations.component.ts ***!
  \******************************************************/
/*! exports provided: AnnotationsComponent, AnnotationsComponentTipsBottomSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsComponent", function() { return AnnotationsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsComponentTipsBottomSheet", function() { return AnnotationsComponentTipsBottomSheet; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _annotations_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./annotations.service */ "./src/app/annotations/annotations.service.ts");
/* harmony import */ var _app_communication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/communication.service */ "./src/app/communication.service.ts");
/* harmony import */ var _app_entity_documents_entity_documents_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/entity-documents/entity-documents.service */ "./src/app/entity-documents/entity-documents.service.ts");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
// make this component a child component of doc-display
// page number only goes from doc-display to
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










// then import the actual library using require() instead of import
var pdfjs = __webpack_require__(/*! pdfjs-dist */ "./node_modules/pdfjs-dist/build/pdf.js");
// @reference: https://github.com/mozilla/pdf.js/issues/7909
pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/build/pdf.worker.js';
;
var AnnotationsComponent = /** @class */ (function () {
    function AnnotationsComponent(router, route, mainService, comm, docsService, bottomSheet) {
        this.router = router;
        this.route = route;
        this.mainService = mainService;
        this.comm = comm;
        this.docsService = docsService;
        this.bottomSheet = bottomSheet;
        this.displayFullDoc = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"];
        // all annotations in the entity or document
        // from the service
        this.annList = [];
        this.getMethod = "regular";
        this.branch = [];
        this.selectedIndex = 0;
        this.pageSize = 10;
        this.currentPage = 1;
        // create ann
        this.showAnnCreateForm = false;
        this.inHighlightMode = false;
        this.highlightsCoord = [];
        this.textareaRows = 10;
        this.mode = "create";
        this.showAnnUpdateForm = false;
        this.highlightDisplayed = false;
        this.keywordsStr = "";
        // document
        this.scale = 1.2; // viewpoint scale;
        this.mouseDown = false;
    }
    AnnotationsComponent.prototype.ngOnChanges = function (changes) {
        if (!this.page) {
            this.page = 1;
        }
        this.renderPage(this.page);
    };
    AnnotationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.page) {
            this.page = 1;
        }
        if (this.nodeAnnotationId) {
            this.mainService.setBranch(this.nodeAnnotationId);
        }
        //pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/build/pdf.worker.js';
        //this.renderPage(this.page)
        this.userName = localStorage.getItem("userName");
        this.route.paramMap.subscribe(function (paramMap) {
            _this.entityType = paramMap.get("entityType");
            _this.entityId = paramMap.get("entityId");
            if (_this.entityType == null) {
                _this.entityType = "my-library";
                _this.entityId = "my-library";
            }
        });
        if (this.entityType == "classes") {
            this.entity = "class";
        }
        if (this.entityType == "groups") {
            this.entity = "group";
        }
        if (this.entityType == "my-library") {
            this.entity = "library";
        }
        this.annCreate = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            content: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
            }),
            parent: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
        });
        this.annUpdate = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            _id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
            }),
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: []
            }),
            content: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
            }),
            highlightsCoord: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            parent: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            children: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
            creatorName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
            }),
            annListIdx: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
            }),
            branchIdx: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
            }),
        });
        this.getRootAnns(this.page);
        this.sub = this.mainService.annListUpdated
            .subscribe(function (res) {
            _this.annList = res.annotations;
            _this.getMethod = res.getMethod;
        });
        this.sub = this.mainService.branchUpdated
            .subscribe(function (res) {
            _this.branch = res;
            console.log("new branch", _this.branch);
            _this.selectedIndex = 1;
        });
        // dynamically determine number of rows in textarea
    };
    AnnotationsComponent.prototype.renderPage = function (page) {
        /*
        reference for using pdfjs module
        https://mozilla.github.io/pdf.js/examples/
        */
        var _this = this;
        pdfjs.getDocument(this.documentUrl).then(function (pdf) {
            _this.maxPage = pdf.numPages;
            pdf.getPage(page).then(function (currentPage) {
                var viewport = currentPage.getViewport(_this.scale);
                //let canvas = <HTMLCanvasElement>document.getElementById("the-canvas");
                var canvas = _this.pdfDisplay.nativeElement;
                var context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                currentPage.render(renderContext).then(function () {
                    //console.log("page rendered")
                });
            });
        });
    };
    AnnotationsComponent.prototype.displayDocument = function () {
        this.displayFullDoc.emit(true);
    };
    // document
    AnnotationsComponent.prototype.toPreviousPage = function () {
        if (this.page > 1) {
            //this.safeUpdatePage(-1);
            this._beforeUpdatePage();
            this.page--;
            this._afterUpdatePage(this.page);
        }
    };
    AnnotationsComponent.prototype.toNextPage = function () {
        if (this.page < this.maxPage) {
            //this.safeUpdatePage(+1);
            this._beforeUpdatePage();
            this.page++;
            this._afterUpdatePage(this.page);
        }
    };
    AnnotationsComponent.prototype.showTips = function () {
        this.bottomSheet.open(AnnotationsComponentTipsBottomSheet, {
            data: {
                entityType: this.entityType,
                entity: this.entity,
            }
        });
    };
    AnnotationsComponent.prototype._beforeUpdatePage = function () {
        this.highlightDisplayed = false;
        this.inHighlightMode = false;
        this.highlightsCoord = [];
    };
    AnnotationsComponent.prototype._afterUpdatePage = function (page) {
        this.renderPage(page);
        this.getRootAnns(page);
    };
    AnnotationsComponent.prototype.navigateTo = function (event) {
        var navPage = parseInt(event.target.value, 10);
        if (isNaN(navPage)) {
            //this.router.navigate(["groups", this.groupName, this.groupId, this.litId]);
            return;
        }
        else {
            this._beforeUpdatePage();
            if (navPage < 1) {
                this.page = 1;
            }
            else if (navPage > this.maxPage) {
                this.page = this.maxPage;
            }
            else {
                this.page = navPage;
            }
            this._afterUpdatePage(this.page);
            event.target.value = "";
            return;
        }
    };
    AnnotationsComponent.prototype.clearHighlight = function () {
        this._beforeUpdatePage();
        this.renderPage(this.page);
        this._setCursorStyle();
        return new Promise(function (resolve, reject) {
            resolve(true);
        });
    };
    AnnotationsComponent.prototype.mousedown = function (event) {
        if (this.inHighlightMode) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var canvasX = 0;
            var canvasY = 0;
            var currentElement = event.target;
            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            } while (currentElement = currentElement.offsetParent);
            canvasX = event.pageX - totalOffsetX;
            canvasY = event.pageY - totalOffsetY;
            this.initX = canvasX;
            this.initY = canvasY;
            this.startingPoint = canvasX;
            this.mouseDown = true;
        }
    };
    AnnotationsComponent.prototype.mousemove = function (event) {
        if (this.inHighlightMode && this.mouseDown) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var canvasX = 0;
            var canvasY = 0;
            var currentElement = event.target;
            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            } while (currentElement = currentElement.offsetParent);
            canvasX = event.pageX - totalOffsetX;
            canvasY = event.pageY - totalOffsetY;
            var canvas = event.target;
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(this.startingPoint, this.initY);
            ctx.lineTo(canvasX, this.initY);
            ctx.strokeStyle = _env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].strokeStyle;
            ctx.globalAlpha = _env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].globalAlpha;
            ctx.lineWidth = _env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].lineWidth;
            ctx.stroke();
            this.startingPoint = canvasX;
        }
    };
    AnnotationsComponent.prototype.mouseup = function (event) {
        if (this.inHighlightMode) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var canvasX = 0;
            var canvasY = 0;
            var currentElement = event.target;
            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            } while (currentElement = currentElement.offsetParent);
            canvasX = event.pageX - totalOffsetX;
            canvasY = event.pageY - totalOffsetY;
            this.finalX = canvasX;
            this.finalY = canvasY;
            var highlightCoord = {
                initX: this.initX,
                initY: this.initY,
                finalX: this.finalX,
            };
            this.highlightsCoord.push(highlightCoord);
            this.mouseDown = false;
        }
    };
    AnnotationsComponent.prototype.getRootAnns = function (page) {
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
        console.log("getting root annotations", this.getQuery);
        this.mainService.getAnnotations(this.getQuery);
        //this.branch = []
    };
    AnnotationsComponent.prototype.isNode = function (ann, branch) {
        if (branch.indexOf(ann) === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    AnnotationsComponent.prototype.onSelectedTabChange = function (event) {
        //this.selectedIndex = event.index;
        if (event.index == 0 && this.highlightDisplayed) {
            this.clearHighlight();
        }
        if (event.index == 0) {
            this.getQuery = {
                page: this.page,
                documentId: this.documentId
            };
            this.mainService.getAnnotations(this.getQuery);
        }
        // If back to the root annotation panel
        // clean highlight from the current tree
    };
    // pagination
    AnnotationsComponent.prototype.onChangePagination = function (pageData) {
        this.pageSize = pageData.pageSize;
        this.currentPage = pageData.pageIndex + 1;
        //this.getQuery.pageSize = this.pageSize;
        //this.getQuery.currentPage = this.currentPage;
        //this.mainService.getAnnotations(this.getQuery)
    };
    AnnotationsComponent.prototype.startNewThread = function () {
        this.mode = "create";
        this.showAnnCreateForm = true;
        this.selectedIndex = 0;
        //this.clearHighlight();
    };
    AnnotationsComponent.prototype.createAnn = function () {
        if (this.annCreate.invalid) {
            return;
        }
        var annotation = {
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
                this.annCreate.value.parent : "root",
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
    };
    AnnotationsComponent.prototype.updateAnn = function () {
        if (this.annUpdate.invalid) {
            return;
        }
        var annotation = {
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
                this.annUpdate.value.parent : "root",
            children: this.annUpdate.value.children,
        };
        this.mainService.updateAnnotation(annotation, this.annUpdate.value.annListIdx, this.annUpdate.value.branchIdx);
        this.annUpdate.reset();
        this.highlightsCoord = [];
        this.inHighlightMode = false;
        this.showAnnUpdateForm = false;
    };
    AnnotationsComponent.prototype.addHighlight = function (event) {
        this.inHighlightMode = !this.inHighlightMode;
        //const button = event.target;
        this._setCursorStyle();
    };
    AnnotationsComponent.prototype._setCursorStyle = function () {
        if (this.inHighlightMode) {
            //@Todo change the cursor to brush
            this.pdfDisplay.nativeElement.style.cursor = "text";
        }
        else {
            this.pdfDisplay.nativeElement.style.cursor = "default";
        }
    };
    AnnotationsComponent.prototype.discard = function () {
        this.showAnnCreateForm = false;
        this.annCreate.reset();
        this.showAnnUpdateForm = false;
        this.annUpdate.reset();
        if (this.inHighlightMode) {
            this.clearHighlight();
            this.inHighlightMode = false;
            //this.comm.inHighlightMode.next(false);
        }
    };
    AnnotationsComponent.prototype.viewChildren = function (annotation) {
        this._beforeUpdatePage();
        this.page = annotation.page;
        this.renderPage(this.page);
        this.mainService.setBranch(annotation._id);
    };
    AnnotationsComponent.prototype.viewParent = function (annotation) {
        this.mainService.setBranch(annotation.parent);
        //this.comm.clearHighlight.next(true);
    };
    AnnotationsComponent.prototype.timestampToDate = function (timestamp) {
        var date = new Date(timestamp);
        return date.toString().split(" ").slice(0, 4).join(" ");
    };
    AnnotationsComponent.prototype.reply = function (annotation) {
        this.mode = "reply";
        //this.updateDocIdAndPage(annotation);
        this.annCreate.patchValue({
            parent: annotation._id
        });
        // set current ann to node of a branch
        //this.mainService.setBranch(annotation);
        this.showAnnCreateForm = true;
    };
    AnnotationsComponent.prototype.edit = function (annotation) {
        // show the highlight of the current annotation
        this.mode = "edit";
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
    };
    AnnotationsComponent.prototype.showHighlight = function (annotation) {
        this.highlightDisplayed = true;
        var canvas = document.getElementsByTagName("canvas")[0];
        var ctx = canvas.getContext("2d");
        for (var _i = 0, _a = annotation.highlightsCoord; _i < _a.length; _i++) {
            var line = _a[_i];
            ctx.beginPath();
            ctx.moveTo(line.initX, line.initY);
            ctx.lineTo(line.finalX, line.initY);
            ctx.strokeStyle = _env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].strokeStyle;
            ctx.globalAlpha = _env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].globalAlpha;
            ctx.lineWidth = _env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].lineWidth;
            ctx.stroke();
        }
    };
    AnnotationsComponent.prototype.delete = function (annotation) {
        this.mainService.deleteAnnotation(annotation, this.getParentIndex(annotation));
        if (this.highlightDisplayed) {
            this.clearHighlight();
        }
    };
    AnnotationsComponent.prototype.getParentIndex = function (annotation) {
        if (annotation.parent == "root") {
            return -1;
        }
        else {
            for (var _i = 0, _a = this.annList; _i < _a.length; _i++) {
                var ann = _a[_i];
                if (ann._id == annotation.parent) {
                    return this.annList.indexOf(ann);
                    break;
                }
            }
        }
    };
    //filter
    AnnotationsComponent.prototype.search = function (event) {
        var query = event.target.value.trim();
        if (query == "") {
            this.getQuery = {
                documentId: this.documentId,
                page: this.page,
            };
            this.keywordsStr = "";
            this.mainService.getAnnotations(this.getQuery);
            return;
        }
        var filterStr;
        var queryObject;
        if (query.indexOf("|") > -1) {
            // if there is a pipeline, then get keywords as
            // everything before the pipeline
            var keywords = query.substr(0, query.indexOf("|")).trim();
            if (keywords === "*") {
                this.keywordsStr = "";
            }
            else {
                this.keywordsStr = keywords;
            }
            filterStr = query.substr(query.indexOf("|") + 1).trim();
            var filter = this.filterParse(filterStr);
            if (filter != false) {
                filter = filter;
                queryObject = {
                    keywords: keywords,
                    entityType: this.entityType,
                    entityId: this.entityId,
                    filter: filter
                };
            }
            else {
                this.keywordsStr = "";
                // invalid filter options
                // display error message to users
                return;
            }
        }
        else {
            // keywords only, no filter options
            if (query === "*") {
                this.keywordsStr = "";
            }
            else {
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
    };
    AnnotationsComponent.prototype.filterParse = function (filterStr) {
        // return a javascript object
        // get valid options
        var optionList = [
            "--creator-name", "--editor-name",
            "--document",
            "--current-page",
            "--root-only",
        ];
        // check if filterStr has any invalid options
        var possibleOptions = [];
        for (var _i = 0, _a = filterStr.split(" "); _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.startsWith("--")) {
                possibleOptions.push(s);
            }
        }
        var invalidOptions = [];
        for (var _b = 0, possibleOptions_1 = possibleOptions; _b < possibleOptions_1.length; _b++) {
            var op = possibleOptions_1[_b];
            if (optionList.indexOf(op) == -1) {
                invalidOptions.push(op);
            }
        }
        if (invalidOptions.length > 0) {
            this.message = invalidOptions[0] + " is an invalid option.";
            return false;
        }
        else {
            var filter = {
                creatorName: null,
                editorName: null,
                documentId: null,
                page: null,
                parent: null,
            };
            for (var _c = 0, possibleOptions_2 = possibleOptions; _c < possibleOptions_2.length; _c++) {
                var op = possibleOptions_2[_c];
                if (op == "--creator-name") {
                    if (this.valueOf(filterStr, op) != false) {
                        filter["creatorName"] = this.valueOf(filterStr, op);
                    }
                    else {
                        this.message = "you need supply a valid value for creatorName";
                        return;
                    }
                }
                if (op == "--editor-name") {
                    if (this.valueOf(filterStr, op) != false) {
                        filter["editorName"] = this.valueOf(filterStr, op);
                    }
                    else {
                        this.message = "you need to supply a valid value for editorName";
                        return;
                    }
                }
                if (op == "--document") {
                    filter["documentId"] = this.documentId;
                }
                if (op == "--current-page") {
                    filter["page"] = this.page;
                    filter["documentId"] = this.documentId;
                }
                if (op == "--root-only") {
                    filter["parent"] = "root";
                }
            }
            this.message = "";
            return filter;
        }
    };
    AnnotationsComponent.prototype.valueOf = function (filterStr, option) {
        var list = filterStr.split(" ");
        var valueIdx = list.indexOf(option) + 1;
        if (list[valueIdx].startsWith("--")) {
            return false;
        }
        else {
            return list[valueIdx];
        }
    };
    AnnotationsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], AnnotationsComponent.prototype, "displayFullDoc", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AnnotationsComponent.prototype, "page", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AnnotationsComponent.prototype, "documentTitle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AnnotationsComponent.prototype, "documentId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AnnotationsComponent.prototype, "documentUrl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AnnotationsComponent.prototype, "nodeAnnotationId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pdfDisplay'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AnnotationsComponent.prototype, "pdfDisplay", void 0);
    AnnotationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-annotations',
            template: __webpack_require__(/*! ./annotations.component.html */ "./src/app/annotations/annotations.component.html"),
            styles: [__webpack_require__(/*! ./annotations.component.css */ "./src/app/annotations/annotations.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _annotations_service__WEBPACK_IMPORTED_MODULE_3__["AnnotationsService"],
            _app_communication_service__WEBPACK_IMPORTED_MODULE_4__["CommunicationService"],
            _app_entity_documents_entity_documents_service__WEBPACK_IMPORTED_MODULE_5__["EntityDocumentsService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatBottomSheet"]])
    ], AnnotationsComponent);
    return AnnotationsComponent;
}());

var AnnotationsComponentTipsBottomSheet = /** @class */ (function () {
    function AnnotationsComponentTipsBottomSheet(data, bottomSheetRef) {
        this.data = data;
        this.bottomSheetRef = bottomSheetRef;
    }
    AnnotationsComponentTipsBottomSheet.prototype.ngOnInit = function () {
        console.log("this data", this.data);
        this.entityType = this.data.entityType;
        this.entity = this.data.entity;
    };
    AnnotationsComponentTipsBottomSheet.prototype.openLink = function (event) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    };
    AnnotationsComponentTipsBottomSheet = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./annotations-component-tips-bottom-sheet.html */ "./src/app/annotations/annotations-component-tips-bottom-sheet.html"),
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MAT_BOTTOM_SHEET_DATA"])),
        __metadata("design:paramtypes", [Object, _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatBottomSheetRef"]])
    ], AnnotationsComponentTipsBottomSheet);
    return AnnotationsComponentTipsBottomSheet;
}());



/***/ }),

/***/ "./src/app/annotations/annotations.service.ts":
/*!****************************************************!*\
  !*** ./src/app/annotations/annotations.service.ts ***!
  \****************************************************/
/*! exports provided: AnnotationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsService", function() { return AnnotationsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




;
var AnnotationsService = /** @class */ (function () {
    function AnnotationsService(http) {
        this.http = http;
        // All annotations in the entity or document
        this.annList = [];
        this.annListUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.branch = [];
        this.branchUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.displayContext = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.apiUrl = _env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/annotations/";
    }
    AnnotationsService.prototype.getAnnotations = function (query) {
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set("documentId", query.documentId)
            .set("page", query.page.toString());
        this.http.get(this.apiUrl + 'getAnnotations', { params: params }).subscribe(function (res) {
            _this.annList = res.annotations;
            _this.totalAnns = res.totalAnns;
            _this.annListUpdated.next({
                annotations: _this.annList.slice(),
                getMethod: 'regular'
            });
        });
    };
    AnnotationsService.prototype.searchAnnotations = function (queryObject) {
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set("keywords", queryObject.keywords)
            .set("entityType", queryObject.entityType)
            .set("entityId", queryObject.entityId);
        this.http.get(this.apiUrl + 'searchAnnotations', { params: params }).subscribe(function (res) {
            _this.annList = res.annotations;
            var filter = queryObject.filter;
            Object.keys(filter).forEach(function (key) {
                if (filter[key] !== null) {
                    _this.annList = _this.annList.filter(function (item) { return item[key] == filter[key]; });
                }
            });
            _this.totalAnns = res.totalAnns;
            _this.annListUpdated.next({
                annotations: _this.annList.slice(),
                getMethod: "search"
            });
        });
    };
    AnnotationsService.prototype.setBranch = function (parent) {
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set("parent", parent);
        this.http.get(this.apiUrl + "setBranch", { params: params }).subscribe(function (res) {
            _this.branch = res.branch;
            console.log("current branch", parent, _this.branch);
            _this.branchUpdated.next(_this.branch.slice());
        });
    };
    AnnotationsService.prototype.createAnnotation = function (annotation) {
        var _this = this;
        this.http.post(this.apiUrl + 'createAnnotation', annotation).subscribe(function (res) {
            annotation._id = res._id;
            annotation.creatorName = res.creatorName;
            annotation.docTitle = res.docTitle;
            //if it is a reply
            if (annotation.parent != "root") {
                //if the annotation is a reply to the current node
                if (annotation.parent === _this.branch[0]._id) {
                    _this.branch[0].children.push(annotation._id);
                    _this.branch.push(annotation);
                    _this.branchUpdated.next(_this.branch.slice());
                }
                else {
                    // it is the reply to a child node of current
                    // branch
                    var idx = void 0;
                    for (var _i = 0, _a = _this.branch; _i < _a.length; _i++) {
                        var ann = _a[_i];
                        if (ann._id === annotation.parent) {
                            idx = _this.branch.indexOf(ann);
                            break;
                        }
                    }
                    _this.branch[idx].children.push(annotation._id);
                    _this.branchUpdated.next(_this.branch.slice());
                }
            }
            else {
                _this.annList.push(annotation);
            }
            //this.annList.push(annotation);
            _this.annListUpdated.next({
                annotations: _this.annList.slice(),
                getMethod: 'regular'
            });
        });
    };
    AnnotationsService.prototype.updateAnnotation = function (annotation, annListIdx, branchIdx) {
        var _this = this;
        this.http.put(this.apiUrl + 'updateAnnotation', annotation).subscribe(function (res) {
            annotation.lastEditTime = Date.now();
            annotation.editorName = localStorage.getItem("userName");
            _this.branch[branchIdx] = annotation;
            _this.branchUpdated.next(_this.branch.slice());
        });
    };
    AnnotationsService.prototype.deleteAnnotation = function (annotation, parentIndex) {
        // deletion can happen only in a branch
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set("_id", annotation._id)
            .set("parent", annotation.parent);
        this.http.delete(this.apiUrl + 'deleteAnnotation', { params: params }).subscribe(function (res) {
            _this.annList = _this.annList.filter(function (ann) { return ann._id != annotation._id; });
            // if deleted ann has a parent
            // splice this id from parent.children
            if (_this.branch[0]._id == annotation._id) {
                _this.branch = [];
            }
            else {
                // update branchNode children
                _this.branch[0].children = _this.branch[0].
                    children.filter(function (_id) { return _id != annotation._id; });
                _this.branch = _this.branch.filter(function (child) { return child._id != annotation._id; });
            }
            //this.annListUpdated.next([...this.annList]);
            _this.branchUpdated.next(_this.branch.slice());
        });
    };
    AnnotationsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AnnotationsService);
    return AnnotationsService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth/auth-guard */ "./src/app/auth/auth-guard.ts");
/* harmony import */ var _app_entities_entities_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/entities/entities.component */ "./src/app/entities/entities.component.ts");
/* harmony import */ var _app_entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @app/entity-detail/entity-detail.component */ "./src/app/entity-detail/entity-detail.component.ts");
/* harmony import */ var _app_support_feedback_support_feedback_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/support-feedback/support-feedback.component */ "./src/app/support-feedback/support-feedback.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


//import { LitsComponent } from './personal/lits/lits.component';
//import { LitOpenComponent } from './personal/lits/lit-open/lit-open.component';







var appRoutes = [
    { path: '', component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    {
        path: "profile", component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_4__["ProfileComponent"],
        canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]]
    },
    {
        path: 'my-library', component: _app_entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_7__["EntityDetailComponent"],
        canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]]
    },
    {
        path: 'entity/:entityType',
        component: _app_entities_entities_component__WEBPACK_IMPORTED_MODULE_6__["EntitiesComponent"],
        canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]]
    },
    {
        path: 'entity/:entityType/:entityName/:entityId',
        component: _app_entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_7__["EntityDetailComponent"],
        canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]]
    },
    {
        path: 'login', component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"],
    },
    {
        path: 'entity/join/:entityType/:entityName/:entityId',
        component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    },
    {
        path: 'signup', component: _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_2__["SignupComponent"],
    },
    {
        path: 'support-feedbacks', component: _app_support_feedback_support_feedback_component__WEBPACK_IMPORTED_MODULE_8__["SupportFeedbackComponent"],
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(appRoutes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            providers: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuard"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-footer {\n  width:100%;\n  margin-bottom:0px;\n\n}\n\n.page-wrap {\n  display:flex;\n  flex-direction:column;\n  min-height:100vh;\n}\n\n.content {\n  flex:1;\n}\n\nmain {\n  display:flex;\n  flex-direction:column;\n  > *:not(router-outlet){\n    flex:1;\n    display:block;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCOztDQUVuQjs7QUFFRDtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsaUJBQWlCO0NBQ2xCOztBQUVEO0VBQ0UsT0FBTztDQUNSOztBQUVEO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QjtJQUNFLE9BQU87SUFDUCxjQUFjO0dBQ2Y7Q0FDRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWZvb3RlciB7XG4gIHdpZHRoOjEwMCU7XG4gIG1hcmdpbi1ib3R0b206MHB4O1xuXG59XG5cbi5wYWdlLXdyYXAge1xuICBkaXNwbGF5OmZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgbWluLWhlaWdodDoxMDB2aDtcbn1cblxuLmNvbnRlbnQge1xuICBmbGV4OjE7XG59XG5cbm1haW4ge1xuICBkaXNwbGF5OmZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgPiAqOm5vdChyb3V0ZXItb3V0bGV0KXtcbiAgICBmbGV4OjE7XG4gICAgZGlzcGxheTpibG9jaztcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n\n<main class=\"content\">\n<router-outlet></router-outlet>\n</main>\n\n<!--app-footer></app-footer-->\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.authService.autoAuthUser();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth/signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth/auth-interceptor */ "./src/app/auth/auth-interceptor.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _directives_mathjax_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/mathjax.directive */ "./src/app/directives/mathjax.directive.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _my_library_my_library_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./my-library/my-library.component */ "./src/app/my-library/my-library.component.ts");
/* harmony import */ var _pipes_shorten_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pipes/shorten.pipe */ "./src/app/pipes/shorten.pipe.ts");
/* harmony import */ var _pipes_highlight_keywords_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pipes/highlight-keywords.pipe */ "./src/app/pipes/highlight-keywords.pipe.ts");
/* harmony import */ var _entities_entities_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./entities/entities.component */ "./src/app/entities/entities.component.ts");
/* harmony import */ var _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./entity-detail/entity-detail.component */ "./src/app/entity-detail/entity-detail.component.ts");
/* harmony import */ var _doc_display_doc_display_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./doc-display/doc-display.component */ "./src/app/doc-display/doc-display.component.ts");
/* harmony import */ var _annotations_annotations_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./annotations/annotations.component */ "./src/app/annotations/annotations.component.ts");
/* harmony import */ var _directives_highlight_directive__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./directives/highlight.directive */ "./src/app/directives/highlight.directive.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _directives_get_position_directive__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./directives/get-position.directive */ "./src/app/directives/get-position.directive.ts");
/* harmony import */ var _tutorials_tutorials_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./tutorials/tutorials.component */ "./src/app/tutorials/tutorials.component.ts");
/* harmony import */ var _directives_auto_set_rows_directive__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./directives/auto-set-rows.directive */ "./src/app/directives/auto-set-rows.directive.ts");
/* harmony import */ var _support_feedback_support_feedback_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./support-feedback/support-feedback.component */ "./src/app/support-feedback/support-feedback.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_7__["HeaderComponent"],
                _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_8__["SignupComponent"],
                _auth_login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_10__["ProfileComponent"],
                _directives_mathjax_directive__WEBPACK_IMPORTED_MODULE_13__["MathJaxDirective"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_14__["FooterComponent"],
                _my_library_my_library_component__WEBPACK_IMPORTED_MODULE_15__["MyLibraryComponent"],
                _pipes_shorten_pipe__WEBPACK_IMPORTED_MODULE_16__["ShortenPipe"],
                _pipes_highlight_keywords_pipe__WEBPACK_IMPORTED_MODULE_17__["HighlightKeywordsPipe"],
                _entities_entities_component__WEBPACK_IMPORTED_MODULE_18__["EntitiesComponent"],
                _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_19__["EntityDetailComponent"],
                _doc_display_doc_display_component__WEBPACK_IMPORTED_MODULE_20__["DocDisplayComponent"],
                //DocsInEntityBottomSheet,
                //DocumentAlertBottomSheet,
                _annotations_annotations_component__WEBPACK_IMPORTED_MODULE_21__["AnnotationsComponent"],
                _directives_highlight_directive__WEBPACK_IMPORTED_MODULE_22__["HighlightDirective"],
                _directives_get_position_directive__WEBPACK_IMPORTED_MODULE_24__["GetPositionDirective"],
                _tutorials_tutorials_component__WEBPACK_IMPORTED_MODULE_25__["TutorialsComponent"],
                _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_19__["AnnotationsSearchTipsBottomSheet"],
                _annotations_annotations_component__WEBPACK_IMPORTED_MODULE_21__["AnnotationsComponentTipsBottomSheet"],
                _directives_auto_set_rows_directive__WEBPACK_IMPORTED_MODULE_26__["AutoSetRowsDirective"],
                _support_feedback_support_feedback_component__WEBPACK_IMPORTED_MODULE_27__["SupportFeedbackComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_12__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatBottomSheetModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatRadioModule"],
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HTTP_INTERCEPTORS"], useClass: _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_11__["AuthInterceptor"], multi: true }
            ],
            entryComponents: [
                _entity_detail_entity_detail_component__WEBPACK_IMPORTED_MODULE_19__["AnnotationsSearchTipsBottomSheet"],
                _annotations_annotations_component__WEBPACK_IMPORTED_MODULE_21__["AnnotationsComponentTipsBottomSheet"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/auth-guard.ts":
/*!************************************!*\
  !*** ./src/app/auth/auth-guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var isAuth = this.authService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(['/login']);
        }
        return isAuth;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth-interceptor.ts":
/*!******************************************!*\
  !*** ./src/app/auth/auth-interceptor.ts ***!
  \******************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authService) {
        this.authService = authService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var authToken = this.authService.getToken();
        var authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + authToken)
        });
        return next.handle(authRequest);
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.isAuthenticated = false;
        this.authStatus = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl + "/" + "user";
    }
    AuthService.prototype.getUserName = function () {
        return localStorage.getItem("userName");
    };
    AuthService.prototype.getToken = function () {
        this.token = localStorage.getItem("token");
        return this.token;
    };
    AuthService.prototype.getIsAuth = function () {
        return this.isAuthenticated;
    };
    AuthService.prototype.checkUserNameAndEmail = function (userName, email) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
            .set("userName", userName)
            .set("email", email);
        return this.http.get(this.apiUrl + "/checkUserNameAndEmail", { params: params });
    };
    AuthService.prototype.createUser = function (userData) {
        return this.http.post(this.apiUrl + "/signup", userData);
    };
    AuthService.prototype.login = function (identity, password) {
        var _this = this;
        var authData = {
            identity: identity,
            password: password,
        };
        this.http
            .post(this.apiUrl + "/login", authData)
            .subscribe(function (response) {
            var token = response.token;
            _this.token = token;
            _this.setUserName(response.userName);
            var expiresInDuration = response.expiresIn;
            _this.setAuthTimer(expiresInDuration);
            _this.autoRenewToken(expiresInDuration);
            _this.isAuthenticated = true;
            _this.authStatus.next(true);
            var now = new Date();
            var expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            _this.saveAuthData(token, expirationDate);
        }, 
        // handle the error in the second argument of subscribe
        function (error) {
            _this.authStatus.next(false);
        });
    };
    AuthService.prototype.loginToJoinEntity = function (identity, password, entityType, entityName, entityId) {
        var _this = this;
        var authData = {
            identity: identity,
            password: password,
            entityType: entityType,
            entityId: entityId
        };
        this.http
            .post(this.apiUrl + "/loginToJoinEntity", authData)
            .subscribe(function (response) {
            var token = response.token;
            _this.token = token;
            _this.setUserName(response.userName);
            var expiresInDuration = response.expiresIn;
            _this.setAuthTimer(expiresInDuration);
            _this.autoRenewToken(expiresInDuration);
            _this.isAuthenticated = true;
            _this.authStatus.next(true);
            var now = new Date();
            var expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            _this.saveAuthData(token, expirationDate);
        }, 
        // handle the error in the second argument of subscribe
        function (error) {
            console.log(error);
            _this.authStatus.next(false);
        });
    };
    AuthService.prototype.setUserName = function (userName) {
        localStorage.setItem("userName", userName);
    };
    //fetch userInfo to update
    AuthService.prototype.fetchUserInfo = function () {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
            .set("userName", this.getUserName());
        return this.http.get(this.apiUrl + "/fetchUserInfo", { params: params });
    };
    AuthService.prototype.updateOneUser = function (updatedInfo) {
        return this.http.put(this.apiUrl, updatedInfo);
    };
    // authenticate the user automatically up on the start of the app
    AuthService.prototype.autoAuthUser = function () {
        var authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        var now = new Date();
        var expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatus.next(true);
        }
    };
    AuthService.prototype.logout = function () {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatus.next(false);
        clearTimeout(this.tokenTimer);
        clearInterval(this.tokenRenewer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    };
    AuthService.prototype.checkUserExist = function (userName) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
            .set("userName", userName);
        return this.http.get(this.apiUrl, { params: params });
    };
    AuthService.prototype.passwordReset = function (userEmail) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
            .set("email", userEmail);
        return this.http.get(this.apiUrl + "/passwordReset/forgotPassword", { params: params });
    };
    AuthService.prototype.updatePassword = function (currentPassword, newPassword) {
        var passData = {
            "userName": this.getUserName(),
            "currentPassword": currentPassword,
            "newPassword": newPassword,
        };
        return this.http.put(this.apiUrl + "/updatePassword", { passData: passData });
    };
    AuthService.prototype.setAuthTimer = function (duration) {
        var _this = this;
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(function () {
            _this.logout();
        }, duration * 1000);
    };
    AuthService.prototype.autoRenewToken = function (duration) {
        var _this = this;
        console.log("Renewing token:" + duration);
        this.tokenRenewer = setInterval(function () {
            //run every 58 mins
            if (_this.isAuthenticated) {
                _this.renewToken();
            }
        }, (duration - 120) * 1000);
    };
    AuthService.prototype.renewToken = function () {
        var _this = this;
        this.http.get(this.apiUrl + "/renewToken").subscribe(function (res) {
            var token = res.token;
            _this.token = token;
            var expiresInDuration = res.expiresIn; // in sec
            _this.setAuthTimer(expiresInDuration);
            _this.isAuthenticated = true;
            _this.authStatus.next(true);
            var now = new Date();
            var expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            _this.saveAuthData(token, expirationDate);
        });
    };
    AuthService.prototype.saveAuthData = function (token, expirationDate) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
    };
    AuthService.prototype.clearAuthData = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userName");
    };
    AuthService.prototype.getAuthData = function () {
        var token = localStorage.getItem("token");
        var expirationDate = localStorage.getItem("expiration");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        };
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: "root" }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/auth/login/login.component.css":
/*!************************************************!*\
  !*** ./src/app/auth/login/login.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n\n}\n\n#title {\n  left: 50%;\n  top:20%;\n  position: fixed;\n  margin-left: -160px;\n}\n\n.signin {\n  margin: auto;\n}\n\n.signin #signinForm {\n  width:300px;\n  margin:auto;\n  margin-top:200px;\n}\n\n.signup div {\n  width: 300px;\n  margin:auto;\n  margin-top:50px;\n}\n\nmat-form-field {\n  width: 100%;\n}\n\nmat-spinner {\n  margin: auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztDQUVDOztBQUVEO0VBQ0UsVUFBVTtFQUNWLFFBQVE7RUFDUixnQkFBZ0I7RUFDaEIsb0JBQW9CO0NBQ3JCOztBQUdEO0VBQ0UsYUFBYTtDQUNkOztBQUVEO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixpQkFBaUI7Q0FDbEI7O0FBR0Q7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLFlBQVk7Q0FDYjs7QUFDRDtFQUNFLGFBQWE7Q0FDZCIsImZpbGUiOiJzcmMvYXBwL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluIHtcblxufVxuXG4jdGl0bGUge1xuICBsZWZ0OiA1MCU7XG4gIHRvcDoyMCU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbWFyZ2luLWxlZnQ6IC0xNjBweDtcbn1cblxuXG4uc2lnbmluIHtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4uc2lnbmluICNzaWduaW5Gb3JtIHtcbiAgd2lkdGg6MzAwcHg7XG4gIG1hcmdpbjphdXRvO1xuICBtYXJnaW4tdG9wOjIwMHB4O1xufVxuXG5cbi5zaWdudXAgZGl2IHtcbiAgd2lkdGg6IDMwMHB4O1xuICBtYXJnaW46YXV0bztcbiAgbWFyZ2luLXRvcDo1MHB4O1xufVxuXG5tYXQtZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xufVxubWF0LXNwaW5uZXIge1xuICBtYXJnaW46IGF1dG87XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/auth/login/login.component.html":
/*!*************************************************!*\
  !*** ./src/app/auth/login/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n\n  <div class=\"signin\">\n    <h1 *ngIf=\"!this.entityId\" id=\"title\">\n      Sign in to Interpolate\n    </h1>\n\n    <h1 id=\"title\" *ngIf=\"this.entityId\">\n      Sign in to join the {{ entity }} {{ entityName }}\n    </h1>\n\n    <div id=\"signinForm\">\n      <form [formGroup]=\"loginForm\" (submit)=\"onLogin()\">\n        <mat-form-field>\n          <input matInput formControlName=\"identity\" placeholder=\"Username or email\">\n          <mat-error *ngIf=\"loginForm.get('identity').invalid\">\n            Please enter a valid email or username.\n          </mat-error>\n        </mat-form-field>\n\n        <mat-form-field>\n          <input type=\"password\" formControlName=\"password\" matInput placeholder=\"Password\">\n          <mat-error *ngIf=\"loginForm.get('password').invalid\">\n            Please enter a valid password.\n          </mat-error>\n        </mat-form-field>\n      </form>\n\n      <div>\n        <button mat-stroked-button color=\"primary\"\n        (click)=\"onLogin()\">Login</button>\n\n        <button mat-stroked-button color=\"primary\"\n        style=\"float:right\"\n        (click)=\"showPsdReset=!showPsdReset\">\n        Forgot password?\n        </button>\n      </div>\n\n      <p>{{ loginFailureMessage }}</p>\n\n      <div *ngIf=\"showPsdReset\">\n\n        <mat-form-field *ngIf=\"showPsdReset\">\n          <input matInput type=\"email\" (keydown.enter)=\"resetPassword($event)\"\n          placeholder=\"Please enter your email and hit enter\">\n        </mat-form-field>\n\n\n        <p *ngIf=\"message\" class=\"text text-info\">\n          {{ message }}\n        </p>\n        <!--p> A password reset form has been sent to your email </p-->\n      </div>\n    </div>\n  </div>\n\n  <div class=\"signup\">\n    <div>\n      <button mat-button color=\"primary\"\n      (click)=\"navigateToSignUp()\">\n        New to Interpolate?\n      </button>\n    </div>\n  </div>\n\n\n\n\n\n\n\n\n</div>\n"

/***/ }),

/***/ "./src/app/auth/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, route, router) {
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.isLoading = false;
        this.loginFailureMessage = "";
        this.pwdResetSent = false;
        this.showPsdReset = false;
        this.entityId = null;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authListenerSubs = this.authService.authStatus
            .subscribe(function (isAuthenticated) {
            console.log(isAuthenticated);
            if (isAuthenticated == false) {
                _this.loginFailureMessage =
                    "Login failed, either email or password is invalid";
            }
            else {
                console.log(_this.entityType);
                if (_this.entityType != "my-library") {
                    _this.router.navigate(["entity", _this.entityType, _this.entityName, _this.entityId]);
                }
                else {
                    _this.router.navigate(["my-library"]);
                }
            }
        });
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            identity: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            }),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            })
        });
        this.route.paramMap.subscribe(function (paramMap) {
            _this.entityType = paramMap.get("entityType");
            _this.entityName = paramMap.get("entityName");
            _this.entityId = paramMap.get("entityId");
            if (!_this.entityType) {
                _this.entityType = "my-library";
            }
        });
    };
    LoginComponent.prototype.onLogin = function () {
        if (this.entityId) {
            this.authService.loginToJoinEntity(this.loginForm.value.identity, this.loginForm.value.password, this.entityType, this.entityName, this.entityId);
        }
        else {
            this.authService.login(this.loginForm.value.identity, this.loginForm.value.password);
        }
    };
    LoginComponent.prototype.navigateToSignUp = function () {
        this.router.navigate(["/signup"]);
    };
    LoginComponent.prototype.resetPassword = function (event) {
        var _this = this;
        var userEmail = event.target.value;
        this.authService.passwordReset(userEmail).subscribe(function (res) {
            _this.message = res.message;
        }, function (error) {
            _this.message = error.error.message;
            console.log("error resetting", error.error.message);
        });
        event.target.value = "";
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        //this.authListenerSubs.unsubscribe();
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/auth/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/auth/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/auth/signup/signup.component.css":
/*!**************************************************!*\
  !*** ./src/app/auth/signup/signup.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  width:100%;\n  height: 50%;\n}\n\n.intro {\n  width: 60%;\n  float: left;\n  margin-left: 5%;\n}\n\nh3 {\n  width: 80%;\n}\n\n.users-specific-info {\n  width: 60%;\n}\n\n#signup {\n  margin-top: 2%;\n  width: 25%;\n  float:right;\n  margin-right:5%;\n}\n\nmat-form-field {\n  width: 100%;\n}\n\nmat-spinner {\n  margin: auto;\n}\n\n#duplicated {\n  background-color: #FAEA03;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtDQUNiOztBQUVEO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixnQkFBZ0I7Q0FDakI7O0FBQUM7RUFDQSxXQUFXO0NBQ1o7O0FBRUQ7RUFDRSxXQUFXO0NBQ1o7O0FBRUQ7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVk7RUFDWixnQkFBZ0I7Q0FDakI7O0FBRUQ7RUFDRSxZQUFZO0NBQ2I7O0FBRUQ7RUFDRSxhQUFhO0NBQ2Q7O0FBRUQ7RUFDRSwwQkFBMEI7Q0FDM0IiLCJmaWxlIjoic3JjL2FwcC9hdXRoL3NpZ251cC9zaWdudXAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluIHtcbiAgd2lkdGg6MTAwJTtcbiAgaGVpZ2h0OiA1MCU7XG59XG5cbi5pbnRybyB7XG4gIHdpZHRoOiA2MCU7XG4gIGZsb2F0OiBsZWZ0O1xuICBtYXJnaW4tbGVmdDogNSU7XG59IGgzIHtcbiAgd2lkdGg6IDgwJTtcbn1cblxuLnVzZXJzLXNwZWNpZmljLWluZm8ge1xuICB3aWR0aDogNjAlO1xufVxuXG4jc2lnbnVwIHtcbiAgbWFyZ2luLXRvcDogMiU7XG4gIHdpZHRoOiAyNSU7XG4gIGZsb2F0OnJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6NSU7XG59XG5cbm1hdC1mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1hdC1zcGlubmVyIHtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4jZHVwbGljYXRlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGQUVBMDM7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signup/signup.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <div class=\"intro\">\n\n    <h1 class=\"text-info\">\n      Interpolate is a platform for sharing annotations on PDF\n      documents\n    </h1>\n\n    <h3>\n      Interpolate is much more than a platform for\n      creating sticky-note-annotations\n      and sharing it with other people. We designed Interpolate\n      as a Q & A platform, where users can directly post questions inside\n      the documents in the form of annotations.\n      This means you can:\n    </h3>\n\n    <ul>\n      <li>\n        <h3>\n          Reply to annotations that are shared with you;\n        </h3>\n\n      </li>\n      <li>\n        <h3>\n          Have a nested-discussion;\n        </h3>\n      </li>\n      <li>\n        <h3>\n        Easily navigate to an annotation through our search engine.\n        </h3>\n      </li>\n    </ul>\n\n    <h3>\n      As we grow our platform, we will add more features based on\n      users' feedback.\n    </h3>\n\n    <div class=\"users-specific-info\">\n\n    <h2 class=\"text-info\">\n      You will find Interpolate helpful, if you are a\n    </h2>\n\n\n    <ul>\n      <li>\n        <h3>\n          Researcher\n        </h3>\n\n      </li>\n      <li>\n        <h3>\n          Instructor\n        </h3>\n      </li>\n      <li>\n        <h3>\n          Student\n        </h3>\n      </li>\n    </ul>\n    \n    </div>\n\n\n  </div>\n  <div id=\"signup\">\n    <!--mat-spinner *ngIf=\"isLoading\"></mat-spinner-->\n    <form  [formGroup]=\"form\" (submit)=\"onSignup()\">\n      <mat-form-field>\n        <input matInput formControlName=\"firstName\" type=\"text\" placeholder=\"First Name\">\n        <mat-error *ngIf=\"form.get('firstName').invalid\">Please enter a valid first name.</mat-error>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput formControlName=\"lastName\"  type=\"text\" placeholder=\"Last Name\">\n        <mat-error *ngIf=\"form.get('lastName').invalid\">Please enter a valid last name.</mat-error>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput formControlName=\"userName\" type=\"text\" placeholder=\"User Name\">\n        <mat-error *ngIf=\"form.get('userName').invalid\">Please enter a valid user name</mat-error>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput formControlName=\"email\" type=\"email\" placeholder=\"E-Mail\">\n        <mat-error *ngIf=\"form.get('email').invalid\">Please enter a valid email.</mat-error>\n      </mat-form-field>\n      <mat-form-field>\n        <input matInput type=\"password\" formControlName=\"password\" placeholder=\"Password\">\n        <mat-error *ngIf=\"form.get('password').invalid\">\n          A valid password must have at least six characters</mat-error>\n      </mat-form-field>\n\n      <mat-form-field>\n        <input matInput type=\"text\" formControlName=\"affiliation\"\n        placeholder=\"Please enter your institute\">\n        <mat-error *ngIf=\"form.get('affiliation').invalid\">\n          Please enter your institute</mat-error>\n      </mat-form-field>\n\n      <button mat-flat-button color=\"primary\" type=\"submit\">Signup</button>\n      <p class=\"text text-info\" *ngIf=\"errorMessage\">\n        {{ errorMessage }}\n      </p>\n    </form>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signup/signup.component.ts ***!
  \*************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.isLoading = false;
        this.invitedSignUp = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required] }),
            lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required] }),
            userName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required] }),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].email] }),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(_env_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].passwordMinLength)] }),
            affiliation: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required] }),
        });
    };
    SignupComponent.prototype.loginToJoin = function () {
        var groupId = this.route.snapshot.params.groupId;
        if (groupId) {
            this.router.navigate(["login/", groupId]);
        }
        else {
            this.router.navigate(["login"]);
        }
    };
    SignupComponent.prototype.onSignup = function () {
        var _this = this;
        if (this.form.invalid) {
            return;
        }
        // create user Object
        var userData = {
            _id: null,
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            userName: this.form.value.userName,
            email: this.form.value.email,
            password: this.form.value.password,
            affiliation: this.form.value.affiliation,
        };
        this.authService.checkUserNameAndEmail(this.form.value.userName, this.form.value.email).subscribe(function (res) {
            if (res.message == "available") {
                _this.authService.createUser(userData)
                    .subscribe(function (res) {
                    _this.authService.login(_this.form.value.userName, _this.form.value.password);
                    _this.form.reset();
                });
            }
            else {
                _this.errorMessage = res.message;
            }
        });
    };
    SignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/auth/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.css */ "./src/app/auth/signup/signup.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/communication.service.ts":
/*!******************************************!*\
  !*** ./src/app/communication.service.ts ***!
  \******************************************/
/*! exports provided: CommunicationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunicationService", function() { return CommunicationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommunicationService = /** @class */ (function () {
    function CommunicationService() {
        // page updated in doc-display component
        this.docIdAndPageUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.documentIdUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.pageUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.inHighlightMode = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.showHighlight = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.clearHighlight = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.highlightsCoord = [];
    }
    CommunicationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], CommunicationService);
    return CommunicationService;
}());



/***/ }),

/***/ "./src/app/directives/auto-set-rows.directive.ts":
/*!*******************************************************!*\
  !*** ./src/app/directives/auto-set-rows.directive.ts ***!
  \*******************************************************/
/*! exports provided: AutoSetRowsDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoSetRowsDirective", function() { return AutoSetRowsDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AutoSetRowsDirective = /** @class */ (function () {
    // automatically set rows for annotation content form control
    function AutoSetRowsDirective(el) {
        this.el = el;
    }
    AutoSetRowsDirective.prototype.ngOnInit = function () {
        var windowHeight = window.innerHeight;
        this.el.nativeElement.rows = Math.floor(windowHeight / 38);
    };
    AutoSetRowsDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appAutoSetRows]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], AutoSetRowsDirective);
    return AutoSetRowsDirective;
}());



/***/ }),

/***/ "./src/app/directives/get-position.directive.ts":
/*!******************************************************!*\
  !*** ./src/app/directives/get-position.directive.ts ***!
  \******************************************************/
/*! exports provided: GetPositionDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetPositionDirective", function() { return GetPositionDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GetPositionDirective = /** @class */ (function () {
    function GetPositionDirective(el) {
        this.el = el;
    }
    GetPositionDirective.prototype.ngOnInit = function () {
        var rect = this.el.nativeElement;
        console.log(Object.keys(rect));
    };
    GetPositionDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appGetPosition]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], GetPositionDirective);
    return GetPositionDirective;
}());



/***/ }),

/***/ "./src/app/directives/highlight.directive.ts":
/*!***************************************************!*\
  !*** ./src/app/directives/highlight.directive.ts ***!
  \***************************************************/
/*! exports provided: HighlightDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlightDirective", function() { return HighlightDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HighlightDirective = /** @class */ (function () {
    function HighlightDirective(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
    }
    HighlightDirective.prototype.ngOnInit = function () {
        console.log("Native element", this.elRef);
    };
    HighlightDirective.prototype.changeCursor = function (event) {
        console.log(event);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("inHighlightMode"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], HighlightDirective.prototype, "changeCursor", null);
    HighlightDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appHighlight]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"]])
    ], HighlightDirective);
    return HighlightDirective;
}());



/***/ }),

/***/ "./src/app/directives/mathjax.directive.ts":
/*!*************************************************!*\
  !*** ./src/app/directives/mathjax.directive.ts ***!
  \*************************************************/
/*! exports provided: MathJaxDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathJaxDirective", function() { return MathJaxDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var mathjax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mathjax */ "./node_modules/mathjax/unpacked/MathJax.js");
/* harmony import */ var mathjax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mathjax__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MathJaxDirective = /** @class */ (function () {
    function MathJaxDirective(elementRef) {
        this.elementRef = elementRef;
    }
    MathJaxDirective.prototype.ngOnChanges = function () {
        this.elementRef.nativeElement.innerHTML = this.mathContent;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.elementRef.nativeElement]);
    };
    MathJaxDirective.prototype.ngOnInit = function () { };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('mathJax'),
        __metadata("design:type", String)
    ], MathJaxDirective.prototype, "mathContent", void 0);
    MathJaxDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[mathJax]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], MathJaxDirective);
    return MathJaxDirective;
}());



/***/ }),

/***/ "./src/app/doc-display/doc-display.component.css":
/*!*******************************************************!*\
  !*** ./src/app/doc-display/doc-display.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-annotations {\n  margin-top:2%;\n  width:100%;\n}\n\n\niframe.pdf-display {\n  width: 100%;\n  height: 2000px;\n}\n\n\n.example-fill-remaining-space {\n  /* This fills the remaining space, by using flexbox.\n     Every toolbar row uses a flexbox row layout. */\n  flex: 1 1 auto;\n}\n\n\n#docUpdateForm, mat-form-field{\n  width: 500px;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jLWRpc3BsYXkvZG9jLWRpc3BsYXkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0NBQ1o7OztBQUdEO0VBQ0UsWUFBWTtFQUNaLGVBQWU7Q0FDaEI7OztBQUNEO0VBQ0U7b0RBQ2tEO0VBQ2xELGVBQWU7Q0FDaEI7OztBQUVEO0VBQ0UsYUFBYTtDQUNkIiwiZmlsZSI6InNyYy9hcHAvZG9jLWRpc3BsYXkvZG9jLWRpc3BsYXkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1hbm5vdGF0aW9ucyB7XG4gIG1hcmdpbi10b3A6MiU7XG4gIHdpZHRoOjEwMCU7XG59XG5cblxuaWZyYW1lLnBkZi1kaXNwbGF5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMjAwMHB4O1xufVxuLmV4YW1wbGUtZmlsbC1yZW1haW5pbmctc3BhY2Uge1xuICAvKiBUaGlzIGZpbGxzIHRoZSByZW1haW5pbmcgc3BhY2UsIGJ5IHVzaW5nIGZsZXhib3guXG4gICAgIEV2ZXJ5IHRvb2xiYXIgcm93IHVzZXMgYSBmbGV4Ym94IHJvdyBsYXlvdXQuICovXG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4jZG9jVXBkYXRlRm9ybSwgbWF0LWZvcm0tZmllbGR7XG4gIHdpZHRoOiA1MDBweDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/doc-display/doc-display.component.html":
/*!********************************************************!*\
  !*** ./src/app/doc-display/doc-display.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div *ngIf=\"mode=='viewDoc'\">\n<mat-toolbar style=\"height: 80px\">\n  <mat-chip-list *ngIf=\"!updatingDocInfo\">\n    <mat-chip>\n      {{ documentTitle }}\n    </mat-chip>\n  </mat-chip-list>\n\n  <!--button mat-button color=\"primary\"\n  *ngIf=\"!updatingDocInfo\"\n  matTooltips=\"update title\"\n  (click)=\"showDocUpdateForm()\">\n    <mat-icon>edit</mat-icon>\n  </button-->\n\n  <form [formGroup]=\"docUpdateForm\" id=\"docUpdateForm\" *ngIf=\"updatingDocInfo\">\n    <mat-form-field>\n      <input matInput formControlName=\"title\"\n        placeholder=\"title of the document\">\n      <mat-error *ngIf=\"docUpdateForm.get('title').invalid\">\n        Please enter the title of the document\n      </mat-error>\n    </mat-form-field>\n  </form>\n\n  <button mat-button color=\"primary\"\n  *ngIf=\"updatingDocInfo\"\n  matTooltips=\"save update\"\n  (click)=\"saveUpdate()\">\n    <mat-icon>save</mat-icon>\n  </button>\n\n  <button mat-button color=\"primary\"\n  matTooltips=\"view and create annotations on this page\"\n  (click)=\"viewAnns()\">\n    View & Create Annotations\n  </button>\n\n  <span class=\"example-fill-remaining-space\">\n  </span>\n\n  <button mat-button color=\"primary\"\n  matTooltips=\"close this document\"\n  (click)=\"closeDoc()\">\n    <mat-icon>close</mat-icon>\n  </button>\n\n</mat-toolbar>\n\n<iframe #iframe width=\"100%\" height=\"2000px\"></iframe>\n\n\n</div>\n\n\n\n<app-annotations\n[documentTitle]=\"documentTitle\"\n(displayFullDoc)=\"displayFullDoc($event)\"\n[documentId]=\"documentId\"\n[documentUrl]=\"documentUrl\"\n[page]=\"annotatedPage\"\n[nodeAnnotationId]=\"nodeAnnotationId\"\n#annotationsComponent\n*ngIf=\"mode=='viewAnns'\">\n</app-annotations>\n"

/***/ }),

/***/ "./src/app/doc-display/doc-display.component.ts":
/*!******************************************************!*\
  !*** ./src/app/doc-display/doc-display.component.ts ***!
  \******************************************************/
/*! exports provided: DocDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocDisplayComponent", function() { return DocDisplayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_entity_documents_entity_documents_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/entity-documents/entity-documents.service */ "./src/app/entity-documents/entity-documents.service.ts");
/* harmony import */ var _app_annotations_annotations_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/annotations/annotations.service */ "./src/app/annotations/annotations.service.ts");
// open and render the file
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DocDisplayComponent = /** @class */ (function () {
    function DocDisplayComponent(docsService, annotationsService) {
        this.docsService = docsService;
        this.annotationsService = annotationsService;
        this.documentId = null;
        this.documentUrl = null;
        this.documentTitle = null;
        this.mode = "viewDoc";
        this.annotatedPage = 1;
        this.onChangeMode = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"];
        this.updatingDocInfo = false;
    }
    DocDisplayComponent.prototype.ngOnChanges = function (changes) {
        if (this.mode == "viewDoc") {
            this._loadPdf();
        }
    };
    DocDisplayComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.mode == "viewAnns") {
            console.log("Annotation mode", this.annotatedPage);
        }
        if (this.nodeAnnotationId) {
            this.mode = "viewAnns";
        }
        this.docUpdateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            }),
        });
        this.sub = this.docsService.docInfoUpdated.subscribe(function (res) {
            if (_this.documentId === res.documentId) {
                _this.documentTitle = res.documentTitle;
                _this.updatingDocInfo = false;
                _this.docUpdateForm.reset();
            }
        });
    };
    DocDisplayComponent.prototype._loadPdf = function () {
        var _this = this;
        if (this.iframe) {
            var viewerUrl = "/assets/pdfjs/web/viewer.html?file=" + this.documentUrl;
            this.iframe.nativeElement.src = viewerUrl;
            return;
        }
        else {
            setTimeout(function () {
                _this._loadPdf();
            }, 200);
        }
    };
    DocDisplayComponent.prototype.showDocUpdateForm = function () {
        this.updatingDocInfo = true;
        this.docUpdateForm.setValue({
            title: this.documentTitle
        });
    };
    DocDisplayComponent.prototype.saveUpdate = function () {
        var doc = {
            _id: this.documentId,
            title: this.docUpdateForm.value.title,
            authors: null,
            userId: null,
            entityType: null,
            entityId: null,
            uploadTime: null,
            canDelete: null,
            fileType: null,
        };
        this.docsService.updateDoc(doc);
    };
    DocDisplayComponent.prototype.closeDoc = function () {
        this.docsService.closeDoc.next(this.documentId);
    };
    DocDisplayComponent.prototype.displayFullDoc = function (event) {
        this.mode = "viewDoc";
        this.onChangeMode.emit("viewDoc");
        this._loadPdf();
    };
    DocDisplayComponent.prototype.viewAnns = function () {
        //@Todo set annoated page as current page
        //this.annotatedPage = 1;
        this.mode = "viewAnns";
        this.annotatedPage = +localStorage.getItem("currentPage");
        this.onChangeMode.emit("viewAnns");
    };
    DocDisplayComponent.prototype.ngOnDestroy = function () {
        localStorage.removeItem("currentPage");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pdfViewer'),
        __metadata("design:type", Object)
    ], DocDisplayComponent.prototype, "pdfViewer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('iframe'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DocDisplayComponent.prototype, "iframe", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DocDisplayComponent.prototype, "documentId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DocDisplayComponent.prototype, "documentUrl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DocDisplayComponent.prototype, "documentTitle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DocDisplayComponent.prototype, "mode", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], DocDisplayComponent.prototype, "annotatedPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DocDisplayComponent.prototype, "nodeAnnotationId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DocDisplayComponent.prototype, "onChangeMode", void 0);
    DocDisplayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-doc-display',
            template: __webpack_require__(/*! ./doc-display.component.html */ "./src/app/doc-display/doc-display.component.html"),
            styles: [__webpack_require__(/*! ./doc-display.component.css */ "./src/app/doc-display/doc-display.component.css")]
        }),
        __metadata("design:paramtypes", [_app_entity_documents_entity_documents_service__WEBPACK_IMPORTED_MODULE_2__["EntityDocumentsService"],
            _app_annotations_annotations_service__WEBPACK_IMPORTED_MODULE_3__["AnnotationsService"]])
    ], DocDisplayComponent);
    return DocDisplayComponent;
}());

/*
@Component({
  templateUrl: 'docs-in-entity-bottom-sheet.html',
})
export class DocsInEntityBottomSheet {
  public docsInEntity: Document[] = [];
  public docsToDisplay: Document[] = [];


  private entityType:string;
  private entityName: string;
  private entityId:string;

  private currentPageIndex = 0;
  //public pageSizeOptions = [2,4,10,15,20];
  public pageSize = 10;
  public totalDocsCount: number;

  public keywords:string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private comm: CommunicationService,
    private bottomSheetRef: MatBottomSheetRef<DocsInEntityBottomSheet>) {}

  ngOnInit(){
    this.docsInEntity = this.data.docsInEntity;
    this.docsToDisplay = this.docsInEntity.slice(0, this.pageSize);
    this.totalDocsCount = this.docsInEntity.length;
    this.entityType = this.data.entityType;
    this.entityName = this.data.entityName;
    this.entityId = this.data.entityId;
  }


  openLink(event: MouseEvent, doc: Document): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();

    this.comm.docIdAndPageUpdated.next({
      documentId: doc._id,
      page: 1
    });


  }

  onChangePagination(pageData: PageEvent){
    this.currentPageIndex = pageData.pageIndex;

    this.docsToDisplay = this.docsInEntity.slice(
      this.currentPageIndex,
      this.currentPageIndex + this.pageSize);
  }


  searchDoc(event: Event){
    const keywords = (<HTMLInputElement>event.target).value;

    if(keywords!=""){
      const keywordsList = keywords.split(" ")

      let docsToDisplay = [];
      let cp = [...this.docsInEntity];

      for (let keyword of keywordsList){
        for(let i = 0; i < cp.length; i++){
          if(cp[i].title.toLowerCase().includes(keyword)){
            docsToDisplay.push(cp[i]);
            cp.splice(i, 1);
          }
        }
      }

      this.docsToDisplay = docsToDisplay;
    }else{

      this.docsToDisplay = this.docsInEntity.slice(
        this.currentPageIndex,
        this.currentPageIndex + this.pageSize);
    }
  }
}



@Component({
  templateUrl: 'document-alert-bottom-sheet.html',
  styleUrls: ['./document-alert-bottom-sheet.css']
})
export class DocumentAlertBottomSheet {

  public updateForm : FormGroup;

  public action: string;
  public alertMessage : string;
  public docInfo:Document;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<DocumentAlertBottomSheet>,
    private comm: CommunicationService,
    private docsService: EntityDocumentsService,
  ){}

  ngOnInit(){
    this.action = this.data.action;
    this.alertMessage = this.data.alertMessage;
    this.docInfo = this.data.docInfo;

    if(this.action==='update'){

      this.updateForm = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required]
        }),
        authors: new FormControl(null,
          { validators: [] }),
      });

      this.updateForm.setValue({
        title: this.docInfo.title,
        authors: this.docInfo.authors
      })

    }


  }


  openDoc(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();

    this.comm.docIdAndPageUpdated.next({
      documentId: this.docInfo._id,
      page: 1,
    });
  }

  saveUpdate(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();

    this.docInfo.title = this.updateForm.value.title;
    this.docInfo.authors = this.updateForm.value.authors;

    this.docsService.updateDoc(this.docInfo, this.data.index);
    this.updateForm.reset();

  }

}
*/


/***/ }),

/***/ "./src/app/entities/entities.component.css":
/*!*************************************************!*\
  !*** ./src/app/entities/entities.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  width:800px;\n  margin:auto;\n}\n\n\nmat-form-field,\ninput{\n  width: 100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZW50aXRpZXMvZW50aXRpZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixZQUFZO0NBQ2I7OztBQUdEOztFQUVFLFlBQVk7Q0FDYiIsImZpbGUiOiJzcmMvYXBwL2VudGl0aWVzL2VudGl0aWVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbiB7XG4gIHdpZHRoOjgwMHB4O1xuICBtYXJnaW46YXV0bztcbn1cblxuXG5tYXQtZm9ybS1maWVsZCxcbmlucHV0e1xuICB3aWR0aDogMTAwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/entities/entities.component.html":
/*!**************************************************!*\
  !*** ./src/app/entities/entities.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <mat-tab-group [selectedIndex]=\"tabIdx\">\n\n\n    <mat-tab *ngIf=\"entityType!='my-library'\"\n    label=\"My {{entityType}}\">\n      <mat-nav-list>\n        <a *ngFor=\"let c of myEntities\"\n        mat-list-item (click)=\"displayEntity(c)\">\n          <span mat-line>{{c.name}}</span>\n        </a>\n      </mat-nav-list>\n    </mat-tab>\n\n\n    <mat-tab label=\"Create a {{ singleEntity }}\">\n\n    <mat-card>\n      <mat-card-content>\n\n        <form [formGroup]=\"form\" (submit)=\"createEntity()\">\n          <mat-form-field>\n            <input matInput type=\"text\" formControlName=\"name\"\n            placeholder=\"Name of the {{singleEntity}}\">\n            <mat-error *ngIf=\"form.get('name').invalid\">\n              Please enter the name of the {{singleEntity}} you want to create\n            </mat-error>\n          </mat-form-field>\n          <mat-form-field>\n            <input matInput formControlName=\"description\"\n              placeholder=\"describe your {{ singleEntity }} \">\n            <mat-error *ngIf=\"form.get('description').invalid\">\n              Please describe your {{ singleEntity }}\n            </mat-error>\n          </mat-form-field>\n\n          <div class=\"action\">\n            <button mat-button color=\"primary\" type=\"submit\">\n              Create {{singleEntity}}\n            </button>\n\n            <button mat-button color=\"warn\"\n            (click)=\"discard()\">\n              Discard\n            </button>\n          </div>\n        </form>\n\n      </mat-card-content>\n    </mat-card>\n\n    </mat-tab>\n\n\n    <mat-tab label=\"What you can do\">\n      <div *ngIf=\"entityType==='groups'\">\n\n      <h3 class=\"text text-info\">\n        <b>Groups</b> is an app that enable users in the same\n        group to share annotations amongst each other.\n      </h3>\n\n\n        If you are a student, you can use this app to\n        <ul>\n          <li>\n            Create a study group\n          </li>\n          <li>\n            Add your friends to the study group\n          </li>\n          <li>\n            Upload and share lecture material in your study group\n          </li>\n          <li>\n            Post questions on the shared documents\n          </li>\n          <li>\n            Help each other by responding to questions\n          </li>\n        </ul>\n\n\n        To create a group,\n        <ul>\n          <li>\n            Click on \"Create a group\".\n          </li>\n          <li>\n            After filling out \"group name\" and \"description\",\n            click \"Create group\"\n          </li>\n        </ul>\n\n        You are able to invite other others to join your group by sending\n        them a link (you can see more detail about this once you navigated to\n        a particular group).\n\n        You can see a list of groups that you are a member of at \"My groups\".\n        To navigate to one of them, just click on the group name.\n      </div>\n\n\n      <div *ngIf=\"entityType==='classes'\">\n\n      <h3 class=\"text text-info\">\n        <b>Classes</b> is an app for instructors and student.\n      </h3>\n\n        If you are an instructor, you can use this app to\n        <ul>\n          <li>\n            Create a class\n          </li>\n          <li>\n            Invite your students to join your class\n          </li>\n          <li>\n            Upload and share lecture material to your students\n          </li>\n          <li>\n            Help your students by responding to their questions\n          </li>\n          <li>\n            Teach more efficiently\n          </li>\n        </ul>\n\n        If you are a student, you can use this app to\n        <ul>\n          <li>\n            Join a class\n          </li>\n          <li>\n            Post questions on the materials your instructor uploaded\n          </li>\n          <li>\n            Help each other by responding to other students' question\n          </li>\n          <li>\n            Learn better\n          </li>\n        </ul>\n\n\n        To create a class,\n        <ul>\n          <li>\n            Click on \"Create a class\".\n          </li>\n          <li>\n            After filling out \"class name\" and \"description\",\n            click \"Create class\"\n          </li>\n        </ul>\n\n        You are able to invite other others to join your class by sending\n        them a link (you can see more detail about this once you navigated to\n        a particular class).\n\n        You can see a list of classes that you are a member of at \"My classes\".\n        To navigate to one of them, just click on the class name.\n      </div>\n\n\n\n    </mat-tab>\n\n\n  </mat-tab-group>\n</div>\n"

/***/ }),

/***/ "./src/app/entities/entities.component.ts":
/*!************************************************!*\
  !*** ./src/app/entities/entities.component.ts ***!
  \************************************************/
/*! exports provided: EntitiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntitiesComponent", function() { return EntitiesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_entities_entities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/entities/entities.service */ "./src/app/entities/entities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EntitiesComponent = /** @class */ (function () {
    function EntitiesComponent(route, mainService, authService, router) {
        this.route = route;
        this.mainService = mainService;
        this.authService = authService;
        this.router = router;
        this.myEntities = [];
        this.tabIdx = 0;
    }
    EntitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (paramMap) {
            _this.entityType = paramMap.get("entityType");
            if (_this.entityType === "classes") {
                _this.singleEntity = "class";
            }
            if (_this.entityType === "groups") {
                _this.singleEntity = "group";
            }
            _this.mainService.getEntities(_this.entityType);
        });
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(3)]
            }),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required] }),
        });
        this.sub = this.mainService.myEntitiesUpdated.subscribe(function (res) {
            _this.myEntities = res;
            if (_this.myEntities.length === 0) {
                _this.tabIdx = 2;
            }
            else {
                _this.tabIdx = 0;
            }
        });
    };
    EntitiesComponent.prototype.createEntity = function () {
        if (this.form.invalid) {
            return;
        }
        if (this.entityType === "classes") {
            // constructo group object
            var newClass = {
                _id: null,
                creatorId: "backend",
                name: this.form.value.name,
                description: this.form.value.description,
                membersId: [],
            };
            this.mainService.createEntity("classes", newClass);
        }
        if (this.entityType === "groups") {
            var newGroup = {
                _id: null,
                name: this.form.value.name,
                description: this.form.value.description,
            };
            this.mainService.createEntity("groups", newGroup);
        }
        this.form.reset();
    };
    EntitiesComponent.prototype.discard = function () {
        this.form.reset();
    };
    EntitiesComponent.prototype.displayEntity = function (entity) {
        this.router.navigate(["entity", this.entityType, entity.name, entity._id]);
    };
    EntitiesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-entities',
            template: __webpack_require__(/*! ./entities.component.html */ "./src/app/entities/entities.component.html"),
            styles: [__webpack_require__(/*! ./entities.component.css */ "./src/app/entities/entities.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _app_entities_entities_service__WEBPACK_IMPORTED_MODULE_4__["EntitiesService"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], EntitiesComponent);
    return EntitiesComponent;
}());



/***/ }),

/***/ "./src/app/entities/entities.service.ts":
/*!**********************************************!*\
  !*** ./src/app/entities/entities.service.ts ***!
  \**********************************************/
/*! exports provided: EntitiesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntitiesService", function() { return EntitiesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EntitiesService = /** @class */ (function () {
    function EntitiesService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.apiUrl = _env_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl + "/entities/";
        this.myEntities = [];
        this.myEntitiesUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.selectedEntityUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    EntitiesService.prototype.getEntities = function (entityType) {
        var _this = this;
        var apiUrl;
        if (entityType === "classes") {
            apiUrl = this.apiUrl + "getClasses";
        }
        if (entityType === "groups") {
            apiUrl = this.apiUrl + "getGroups";
        }
        this.http.get(apiUrl).subscribe(function (res) {
            _this.myEntities = res.entities;
            _this.myEntitiesUpdated.next(_this.myEntities.slice());
        });
    };
    EntitiesService.prototype.createEntity = function (entityType, entity) {
        var _this = this;
        var apiUrl;
        if (entityType === "classes") {
            apiUrl = this.apiUrl + "createClass";
        }
        if (entityType === "groups") {
            apiUrl = this.apiUrl + "createGroup";
        }
        this.http.post(apiUrl, entity).subscribe(function (res) {
            _this.myEntities.push(res.entity);
            _this.myEntitiesUpdated.next(_this.myEntities.slice());
        });
    };
    EntitiesService.prototype.getEntityInfo = function (entityType, entityId) {
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]()
            .set("entityType", entityType)
            .set("entityId", entityId);
        this.http.get(this.apiUrl + "getEntityInfo", { params: params }).subscribe(function (res) {
            _this.selectedEntity = res.entity;
            _this.selectedEntityUpdated.next(_this.selectedEntity);
        });
    };
    EntitiesService.prototype.updateEntity = function (entityType, entity) {
        var apiUrl;
        if (entityType === "groups") {
            apiUrl = this.apiUrl + "updateGroup";
        }
        if (entityType === "classes") {
            apiUrl = this.apiUrl + "updateClass";
        }
        return this.http.put(apiUrl, entity);
    };
    EntitiesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _app_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], EntitiesService);
    return EntitiesService;
}());



/***/ }),

/***/ "./src/app/entity-detail/annotations-search-tips-bottom-sheet.html":
/*!*************************************************************************!*\
  !*** ./src/app/entity-detail/annotations-search-tips-bottom-sheet.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3 class=\"text text-info\">\n  You can do many fancy things when search for annotations\n</h3>\n\n<p>\nWhen you first land to this page, by default, the root annotations\nin your group / class / My Library will show up. A root annotation\nis the starting point of a thread a user made on a document.\n</p>\n\n<h4 class=\"text text-info\">\n  The obvious\n</h4>\n<p>\n  Obviously, you can search annotations by keywords.\n  Type the keywords in the search bar and hit enter.\n</p>\n\n<h4 class=\"text text-info\">\n  The not-so-obvious\n</h4>\n\n<p>\n  <b>Wild card search</b>\n  If you want to see every annotation created in your group / class\n  or My Library, type: <br>\n  <code>\n    *\n  </code>\n  <br>\n  in the search bar and hit enter. This will give you every annotation\n  (root, responses, nested-responses...).\n  <br>\n\n  <p>\n  You can append some filter options to your keywords\n  to limit the search scope.\n  <br>\n  <b>Only see annotations created by certain user</b>\n\n  For example, if you want\n  to search for annotations with keywords \"Tower of Babel\"\n  <b>created by yourself</b>. Then, type\n  <br>\n  <code>\n    Tower of Babel | --creator-name \"your username\"\n  </code>\n  Likewise, if for some reason you want to see annotations\n  with keywords \"Tower of Babel\" created by another user\n  in your class or group. They, type\n  <br>\n  <code>\n    Tower of Bable | --creator-name \"another user's username\"\n  </code>\n  <br>\n\n  <b>Only see root annotations</b>\n  If you just want to see root annotations with the keywords\n  \"Tower of Babel\". Type: <br>\n  <code>\n    Tower of Babel | --root-only\n  </code>\n\n  <br>\n  <b>Aggregation</b>\n  You can use --creator-name and --root-only filter together.\n  For example: if you type: <br>\n  <code>\n    Tower of Babel | --creator-name \"Alice\" --root-only\n  </code>\n  you will see root annotations created by Alice (if she is in your group),\n  with the keywords \"Tower of Babel\".\n  <br>\n  If you type:<br>\n  <code>\n    * | --creator-name \"Alice\" --root-only\n  </code>\n  you will see every root annotation created by Alice.\n"

/***/ }),

/***/ "./src/app/entity-detail/entity-detail.component.html":
/*!************************************************************!*\
  !*** ./src/app/entity-detail/entity-detail.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-drawer-container class=\"example-container\">\n  <mat-drawer mode=\"side\" [(opened)]=\"sideNavOpened\" style=\"width:150px\">\n    <mat-nav-list>\n      <button mat-button selected\n      color=\"primary\" (click)=\"showEntityInfo()\">\n        {{ entityName }}\n      </button>\n\n      <a mat-list-item (click)=\"showDocuments()\">\n        Documents\n      </a>\n\n\n      <a mat-list-item (click)=\"showAnnotations()\">\n        Annotations\n      </a>\n\n      <!--div *ngIf=\"panel=='annotations'\" class=\"annotations-control\">\n        <mat-nav-list>\n          <a mat-list-item>\n            Roots\n          </a>\n          <a mat-list-item>\n            Unread\n          </a>\n          <a mat-list-item>\n            Important\n          </a>\n          <a mat-list-item>\n            Created by me\n          </a>\n        </mat-nav-list>\n      </div-->\n      <hr>\n    </mat-nav-list>\n\n    <mat-nav-list *ngIf=\"activatedDocs.length > 0\">\n      <div *ngFor=\"let activatedDoc of activatedDocs\">\n        <a mat-list-item (click)=\"displayDoc(activatedDoc)\">\n          {{activatedDoc.title | shorten:10}}\n        </a>\n      </div>\n    </mat-nav-list>\n\n  </mat-drawer>\n\n  <mat-drawer-content>\n\n    <div *ngIf=\"panel==='entityInfo'\">\n      <mat-toolbar *ngIf=\"entityData\">\n        {{entityName}}\n\n        <button mat-button color=\"primary\"\n        *ngIf=\"entityData.userIsCreator\"\n        (click)=\"showUpdateEntityForm()\">\n          Edit {{entity}} info\n        </button>\n\n        <span class=\"example-fill-remaining-space\">\n        </span>\n\n        <!--button mat-button color=\"warn\"\n        *ngIf=\"entityData.userIsCreator && entityData.docsCount===0\"\n        (click)=\"deleteEntity()\">\n          Delete {{entity}}\n        </button-->\n      </mat-toolbar>\n\n\n      <div class=\"functionality-tutorial\" *ngIf=\"entityType!='my-library'\">\n\n      <mat-card *ngIf=\"updatingEntityInfo\" id=\"entityUpdateForm\">\n        <mat-card-content>\n\n          <form [formGroup]=\"entityUpdate\" (submit)=\"updateEntity()\">\n            <mat-form-field>\n              <input matInput type=\"text\" formControlName=\"name\"\n              placeholder=\"Name of the {{singleEntity}}\">\n              <mat-error *ngIf=\"entityUpdate.get('name').invalid\">\n                Please enter the name of the {{singleEntity}} you want to create\n              </mat-error>\n            </mat-form-field>\n\n            <mat-form-field>\n              <input matInput formControlName=\"description\"\n                placeholder=\"describe your {{ entity}} \">\n              <mat-error *ngIf=\"entityUpdate.get('description').invalid\">\n                Please describe your {{ singleEntity }}\n              </mat-error>\n            </mat-form-field>\n\n            <div>\n              <button mat-button color=\"primary\" type=\"submit\">\n                Save\n              </button>\n\n              <button mat-button color=\"warn\"\n              (click)=\"discardEntityUpdate()\">\n                Discard\n              </button>\n            </div>\n\n          </form>\n\n        </mat-card-content>\n      </mat-card>\n\n\n        <h3 class=\"text text-info\">\n          Created by:\n        </h3>\n\n        <h4 *ngIf=\"entityData\">\n          {{ entityData.creator}}(admin)\n        </h4>\n\n        <h3 class=\"text text-info\">\n          Description of <b>{{ entityName }}</b>:\n        </h3>\n        <h4 *ngIf=\"entityData\">\n          {{ entityData.description }}\n        </h4>\n\n\n        <h3 class=\"text text-info\">\n          Members in <b>{{ entityName }}</b>:\n        </h3>\n\n        <div *ngIf=\"entityData\">\n          <h4 *ngFor=\"let member of entityData.members\">\n            {{ member }}\n          </h4>\n        </div>\n      </div>\n\n      <div class=\"functionality-tutorial\" *ngIf=\"entityType!=='my-library'\">\n        <h3 class=\"text text-info\">\n          To invite people to join <b>{{ entityName }}</b>, email them the link:\n        </h3>\n        <h4>\n          {{ joinLink }}\n        </h4>\n      </div>\n\n      <div class=\"functionality-tutorial\" *ngIf=\"entityType==='my-library'\">\n        <h3>\n          <b>My Library</b> is your own space at <b>Interpoalte</b>.\n        </h3>\n\n        <h4>\n          Documents in <b>My Library</b> are kept private.\n          Just like documents you uploaded here,\n          annotations you created in <b>My Library</b> is only\n          viewable by yourself.\n        </h4>\n\n      </div>\n\n      <div class=\"functionality-tutorial\">\n        <h3 class=\"text text-info\">\n          View and upload documents\n        </h3>\n        <h4>\n          To upload documents and view existing documents in\n          <b>{{ entityName }}</b>, click\n          \"documents\" button on the left panel.\n\n          <div *ngIf=\"entityType!=='my-library'\">\n          Documents\n          uploaded in {{ entityName }} can be accessed and viewed\n          by all members in <b>{{ entityName }}</b>\n        </div>\n        </h4>\n      </div>\n\n      <div class=\"functionality-tutorial\">\n        <h3 class=\"text text-info\">\n          Annotations management\n        </h3>\n\n        <h4>\n          To view and search annotations created in <b>{{entityName}}</b>,\n          click on \"annotations\" button on the left panel.\n        </h4>\n\n\n\n      </div>\n\n\n\n\n\n      <!--div id=\"entityAction\">\n        <button mat-stroked-button color=\"primary\">\n          Update {{ entity }} info\n        </button>\n\n        <button mat-stroked-button\n        style=\"margin-left:1%\"\n        color=\"primary\">\n          Leave {{ entity }}\n        </button>\n\n        <button mat-stroked-button\n        style=\"margin-left:1%\"\n        color=\"primary\">\n          Delete {{ entity }}\n        </button>\n      </div-->\n\n\n\n      <div id=\"info\" *ngIf=\"entityType=='my-library'\">\n\n      </div>\n    </div>\n\n    <div *ngIf=\"panel==='documents'\">\n\n        <mat-toolbar>\n          Documents in {{entityName}}\n\n        <button mat-button selected color=\"primary\"\n        *ngIf=\"userCanUpload\"\n        matTooltip=\"upload a pdf file\" type=\"button\"\n        (click)=\"filePicker.click()\">\n          <mat-icon>cloud_upload</mat-icon>\n          <span> Upload </span>\n        </button>\n\n\n          <span class=\"example-fill-remaining-space\">\n          </span>\n\n          <mat-form-field class=\"search-bar\">\n            <input matInput\n            type=\"text\"\n            placeholder=\"search for a document\"\n            (keyup.backspace)=\"searchDoc($event)\"\n            (keydown.enter)=\"searchDoc($event)\">\n          </mat-form-field>\n\n        </mat-toolbar>\n\n        <div class=\"plain-text\">\n          <h3 class=\"text text-info\"\n          *ngIf=\"!searchPlaced && docsInEntity.length==0\">\n            No documents have been uploaded\n          </h3>\n\n          <h3 class=\"text text-info\"\n          *ngIf=\"!searchPlaced && docsInEntity.length>0\">\n            Please select a document to display\n          </h3>\n\n          <h3 class=\"text text-info\"\n          *ngIf=\"searchPlaced && docsToDisplay.length===0\">\n            No documents match your search\n          </h3>\n\n          <h3 class=\"text text-info\"\n          *ngIf=\"searchPlaced && docsToDisplay.length>0\">\n            Please select a document to display\n          </h3>\n        </div>\n\n\n        <mat-nav-list *ngIf=\"!searchPlaced\">\n        <a *ngFor=\"let doc of docsInEntity\" mat-list-item\n        (click)=\"getFile(doc)\">\n          <span mat-line>{{doc.title}}</span>\n        </a>\n        </mat-nav-list>\n\n        <mat-nav-list *ngIf=\"searchPlaced\">\n        <a *ngFor=\"let doc of docsToDisplay\" mat-list-item\n        (click)=\"getFile(doc)\">\n          <span mat-line>{{doc.title}}</span>\n        </a>\n        </mat-nav-list>\n\n\n      <input type=\"file\" accept=\"application/pdf\"\n      #filePicker (change)=\"onFileSelected($event)\">\n    </div>\n\n    <div *ngIf=\"panel==='annotations'\">\n        <mat-toolbar>\n          Annotations in {{entityName}}\n\n          <button mat-button color=\"primary\"\n          (click)=\"showAnnsSearchTips()\">\n            Tips\n          </button>\n          <span class=\"example-fill-remaining-space\">\n          </span>\n\n          <mat-form-field class=\"search-bar\">\n            <input matInput placeholder=\"search and filters\"\n            (keydown.enter)=\"search($event)\">\n          </mat-form-field>\n        </mat-toolbar>\n\n        <div class=\"plain-text\">\n          <h3 class=\"text text-info\" *ngIf=\"!searchPlaced && annList.length===0\">\n            No annotations have been created in {{ entityName }}\n          </h3>\n          <h3 class=\"text text-info\" *ngIf=\"searchPlaced && annList.length===0\">\n            No annotations match your search\n          </h3>\n          <h3 class=\"text text-info\" *ngIf=\"!searchPlaced && annList.length>0\">\n            Root annotations in {{ entityName }}\n          </h3>\n          <h4 class=\"text text-info\" *ngIf=\"message\">\n            {{ message }}\n          </h4>\n        </div>\n\n        <div class=\"annotations-display\"\n        *ngFor=\"let ann of annList\">\n          <a style=\"cursor: pointer\" (click)=\"displayInContext(ann)\">\n            <h4>\n            Annotation created by {{ann.creatorName}} on\n            {{ ann.docTitle }} page {{ ann.page}}\n            </h4>\n          </a>\n          <div>\n\n            <p mathJax=\"{{ann.title}}\"></p>\n            <p mathJax=\"{{ann.content }}\"></p>\n\n          </div>\n          <hr>\n        </div>\n      </div>\n\n    <div *ngIf=\"panel==='displayDocument'\">\n      <app-doc-display\n      [documentTitle]=\"activeDocTitle\"\n      [documentId]=\"activeDocId\"\n      [documentUrl]=\"activeDocUrl\"\n      [mode]=\"docDisplayMode\"\n      [nodeAnnotationId]=\"nodeAnnotationId\"\n\n      (onChangeMode)=\"changeSideNav($event)\"\n      [annotatedPage]=\"annotatedPage\">\n      </app-doc-display>\n\n    </div>\n  </mat-drawer-content>\n</mat-drawer-container>\n"

/***/ }),

/***/ "./src/app/entity-detail/entity-detail.component.scss":
/*!************************************************************!*\
  !*** ./src/app/entity-detail/entity-detail.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-tab-group {\n  width: 90%;\n  margin: auto; }\n\n#info {\n  margin: auto; }\n\ninput[type=\"file\"] {\n  visibility: hidden; }\n\ndiv.plain-text {\n  margin: 2%; }\n\n#documentControl {\n  float: right; }\n\n.functionality-tutorial {\n  width: 70%;\n  margin: auto; }\n\n#entityAction {\n  margin-top: 5%; }\n\n#control {\n  float: left;\n  height: 100%;\n  margin-top: 1%; }\n\n#contents {\n  margin-left: 10%;\n  margin-top: 2%;\n  width: 50%; }\n\n.example-container {\n  width: 100%;\n  height: 1000px; }\n\n.example-fill-remaining-space {\n  /* This fills the remaining space, by using flexbox.\n     Every toolbar row uses a flexbox row layout. */\n  flex: 1 1 auto; }\n\n.search-bar {\n  width: 50%; }\n\ndiv.annotations-display {\n  margin-left: 5%;\n  width: 50%; }\n\ndiv.annotations-control {\n  margin-left: 10%; }\n\n.example-container {\n  position: absolute;\n  background: #eee; }\n\nmat-drawer {\n  border-right: 1px solid black; }\n\n.content-display-panel {\n  margin-left: 2%; }\n\n#entityUpdateForm {\n  width: 80%; }\n\nmat-form-field {\n  width: 100%; }\n\n/*\n:host {\n    >.container {\n        max-width: 1264px;\n        width: 100%;\n        margin: 0 auto;\n        display: flex;\n        justify-content: space-between;\n        //background: none;\n    }\n    /deep/ {\n        .mat-tab-group {\n            flex-direction: row;\n        }\n        .mat-tab-header {\n          border-bottom: none;\n        }\n        .mat-tab-header-pagination {\n            display: none !important;\n        }\n        .mat-tab-labels {\n            flex-direction: column;\n        }\n        .mat-ink-bar {\n            height: 100%;\n            left: 98% !important;\n        }\n        .mat-tab-body-wrapper {\n            flex: 1 1 auto;\n        }\n    }\n}\n\n.container {\n    position: relative;\n    width: 100%;\n    flex: 1 0 auto;\n    margin: 0 auto;\n    text-align: left;\n}\n\n#content {\n    box-sizing: content-box;\n    margin: 0 auto;\n    padding: 15px;\n    width: 1264px;\n    //background-color: #ffffff;\n}\n\n#content {\n    max-width: 1100px;\n    width: 100%;\n    //background-color: #ffffff;\n    padding: 24px;\n    box-sizing: border-box;\n}\n\n#content,\n#main-content {\n    &::before,\n    &::after {\n        content: \"\";\n        display: table;\n    }\n    &::after {\n        clear: both;\n    }\n}\n\n*/\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zY3IxL2xpMTA4L0NvZGluZ0V4L2ludGVycG9sYXRlL3NyYy9hcHAvZW50aXR5LWRldGFpbC9lbnRpdHktZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVTtFQUNWLGFBQVcsRUFDWjs7QUFFRDtFQUNFLGFBQVksRUFDYjs7QUFFRDtFQUNFLG1CQUFrQixFQUNuQjs7QUFHRDtFQUNFLFdBQVMsRUFDVjs7QUFFRDtFQUNFLGFBQVksRUFDYjs7QUFHRDtFQUNFLFdBQVM7RUFDVCxhQUFXLEVBRVo7O0FBRUQ7RUFDRSxlQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxZQUFVO0VBQ1YsYUFBVztFQUNYLGVBQWEsRUFDZDs7QUFFRDtFQUNFLGlCQUFlO0VBQ2YsZUFBYTtFQUNiLFdBQVMsRUFDVjs7QUFFRDtFQUNFLFlBQVc7RUFDWCxlQUFhLEVBQ2Q7O0FBRUQ7RUFDRTtvREFDa0Q7RUFDbEQsZUFBYyxFQUNmOztBQUVEO0VBQ0UsV0FBUyxFQUNWOztBQUdEO0VBQ0UsZ0JBQWM7RUFDZCxXQUFTLEVBQ1Y7O0FBRUQ7RUFDRSxpQkFBZSxFQUNoQjs7QUFFRDtFQUNFLG1CQUFrQjtFQUNsQixpQkFBZ0IsRUFDakI7O0FBQUM7RUFDQSw4QkFBNkIsRUFDOUI7O0FBRUQ7RUFDRSxnQkFBZSxFQUNoQjs7QUFFRDtFQUNFLFdBQVMsRUFFVjs7QUFBQTtFQUNDLFlBQ0YsRUFBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcUVFIiwiZmlsZSI6InNyYy9hcHAvZW50aXR5LWRldGFpbC9lbnRpdHktZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LXRhYi1ncm91cCB7XG4gIHdpZHRoOiA5MCU7XG4gIG1hcmdpbjphdXRvO1xufVxuXG4jaW5mbyB7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuaW5wdXRbdHlwZT1cImZpbGVcIl0ge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cblxuZGl2LnBsYWluLXRleHQge1xuICBtYXJnaW46MiU7XG59XG5cbiNkb2N1bWVudENvbnRyb2wge1xuICBmbG9hdDogcmlnaHQ7XG59XG5cblxuLmZ1bmN0aW9uYWxpdHktdHV0b3JpYWwge1xuICB3aWR0aDo3MCU7XG4gIG1hcmdpbjphdXRvO1xuXG59XG5cbiNlbnRpdHlBY3Rpb257XG4gIG1hcmdpbi10b3A6NSU7XG59XG5cbiNjb250cm9se1xuICBmbG9hdDpsZWZ0O1xuICBoZWlnaHQ6MTAwJTtcbiAgbWFyZ2luLXRvcDoxJTtcbn1cblxuI2NvbnRlbnRzIHtcbiAgbWFyZ2luLWxlZnQ6MTAlO1xuICBtYXJnaW4tdG9wOjIlO1xuICB3aWR0aDo1MCU7XG59XG5cbi5leGFtcGxlLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6MTAwMHB4O1xufVxuXG4uZXhhbXBsZS1maWxsLXJlbWFpbmluZy1zcGFjZSB7XG4gIC8qIFRoaXMgZmlsbHMgdGhlIHJlbWFpbmluZyBzcGFjZSwgYnkgdXNpbmcgZmxleGJveC5cbiAgICAgRXZlcnkgdG9vbGJhciByb3cgdXNlcyBhIGZsZXhib3ggcm93IGxheW91dC4gKi9cbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5zZWFyY2gtYmFyIHtcbiAgd2lkdGg6NTAlO1xufVxuXG5cbmRpdi5hbm5vdGF0aW9ucy1kaXNwbGF5e1xuICBtYXJnaW4tbGVmdDo1JTtcbiAgd2lkdGg6NTAlO1xufVxuXG5kaXYuYW5ub3RhdGlvbnMtY29udHJvbCB7XG4gIG1hcmdpbi1sZWZ0OjEwJTtcbn1cblxuLmV4YW1wbGUtY29udGFpbmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kOiAjZWVlO1xufSBtYXQtZHJhd2VyIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5jb250ZW50LWRpc3BsYXktcGFuZWwge1xuICBtYXJnaW4tbGVmdDogMiU7XG59XG5cbiNlbnRpdHlVcGRhdGVGb3JtIHtcbiAgd2lkdGg6ODAlO1xuXG59bWF0LWZvcm0tZmllbGR7XG4gIHdpZHRoOjEwMCVcbn1cblxuLypcbjpob3N0IHtcbiAgICA+LmNvbnRhaW5lciB7XG4gICAgICAgIG1heC13aWR0aDogMTI2NHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgLy9iYWNrZ3JvdW5kOiBub25lO1xuICAgIH1cbiAgICAvZGVlcC8ge1xuICAgICAgICAubWF0LXRhYi1ncm91cCB7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICB9XG4gICAgICAgIC5tYXQtdGFiLWhlYWRlciB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLm1hdC10YWItbGFiZWxzIHtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIH1cbiAgICAgICAgLm1hdC1pbmstYmFyIHtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGxlZnQ6IDk4JSAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICAgIC5tYXQtdGFiLWJvZHktd3JhcHBlciB7XG4gICAgICAgICAgICBmbGV4OiAxIDEgYXV0bztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZsZXg6IDEgMCBhdXRvO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbiNjb250ZW50IHtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiAxNXB4O1xuICAgIHdpZHRoOiAxMjY0cHg7XG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuXG4jY29udGVudCB7XG4gICAgbWF4LXdpZHRoOiAxMTAwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuI2NvbnRlbnQsXG4jbWFpbi1jb250ZW50IHtcbiAgICAmOjpiZWZvcmUsXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB9XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgICBjbGVhcjogYm90aDtcbiAgICB9XG59XG5cbiovXG4iXX0= */"

/***/ }),

/***/ "./src/app/entity-detail/entity-detail.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/entity-detail/entity-detail.component.ts ***!
  \**********************************************************/
/*! exports provided: EntityDetailComponent, AnnotationsSearchTipsBottomSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDetailComponent", function() { return EntityDetailComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsSearchTipsBottomSheet", function() { return AnnotationsSearchTipsBottomSheet; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_entities_entities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/entities/entities.service */ "./src/app/entities/entities.service.ts");
/* harmony import */ var _app_entity_documents_entity_documents_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/entity-documents/entity-documents.service */ "./src/app/entity-documents/entity-documents.service.ts");
/* harmony import */ var _app_helpers_mime_type_validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @app/helpers/mime-type.validator */ "./src/app/helpers/mime-type.validator.ts");
/* harmony import */ var _app_communication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/communication.service */ "./src/app/communication.service.ts");
/* harmony import */ var _app_annotations_annotations_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @app/annotations/annotations.service */ "./src/app/annotations/annotations.service.ts");
/* harmony import */ var _app_doc_display_doc_display_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @app/doc-display/doc-display.component */ "./src/app/doc-display/doc-display.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
//dispaly the detail info of a group and class
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












;
var EntityDetailComponent = /** @class */ (function () {
    function EntityDetailComponent(router, route, location, mainService, docsService, annotationsService, comm, bottomSheet) {
        this.router = router;
        this.route = route;
        this.location = location;
        this.mainService = mainService;
        this.docsService = docsService;
        this.annotationsService = annotationsService;
        this.comm = comm;
        this.bottomSheet = bottomSheet;
        this.updatingEntityInfo = false;
        this.docsInEntity = [];
        this.docsToDisplay = [];
        this.activatedDocs = [];
        this.docDisplayMode = "viewDoc";
        this.annList = [];
        this.fileTypeValid = false;
        this.userCanUpload = true;
        this.panel = "entityInfo";
        this.searchPlaced = false;
        this.sideNavOpened = true;
    }
    EntityDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.entityUpdate = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(3)]
            }),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [] }),
        });
        this.uploadForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
            }),
            authors: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [] }),
            file: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
                asyncValidators: []
            })
        });
        this.route.paramMap.subscribe(function (paramMap) {
            _this.entityName = paramMap.get("entityName");
            _this.entityType = paramMap.get("entityType");
            _this.entityId = paramMap.get("entityId");
            if (_this.entityType == null) {
                _this.entityType = "my-library";
                _this.entityName = "My Library";
            }
            if (_this.entityType == "classes") {
                _this.entity = "class";
            }
            if (_this.entityType == "groups") {
                _this.entity = "group";
            }
            if (_this.entityType != "my-library") {
                _this.mainService.getEntityInfo(_this.entityType, _this.entityId);
            }
            _this.joinLink = _env_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].frontEndUrl + "/entity/join/" + _this.entityType +
                "/" + _this.entityName + "/" + _this.entityId;
        });
        this.sub = this.mainService.selectedEntityUpdated.subscribe(function (res) {
            _this.entityData = res;
            if (_this.entityType == "classes" && _this.entityData.userIsCreator === false) {
                _this.userCanUpload = false;
            }
        });
        this.sub = this.docsService.docsUpdatedObs()
            .subscribe(function (res) {
            _this.docsInEntity = res;
        });
        this.sub = this.docsService.closeDoc.subscribe(function (documentId) {
            _this.activatedDocs = _this.activatedDocs.filter(function (item) { return item.documentId != documentId; });
            _this.panel = "documents";
        });
        this.sub = this.annotationsService.annListUpdated
            .subscribe(function (res) {
            _this.annList = res.annotations;
            //this.getMethod = res.getMethod;
        });
        this.sub = this.docsService.docInfoUpdated.subscribe(function (res) {
            _this.activatedDocs.forEach(function (doc) {
                if (doc.documentId === res.documentId) {
                    var idx = _this.activatedDocs.indexOf(doc);
                    doc.title = res.documentTitle;
                    _this.activatedDocs[idx] = doc;
                }
            });
            _this.activeDocTitle = res.documentTitle;
        });
    };
    EntityDetailComponent.prototype.changeSideNav = function (event) {
        console.log(event);
        if (event === "viewAnns") {
            this.sideNavOpened = false;
        }
        if (event === "viewDoc") {
            this.sideNavOpened = true;
        }
    };
    EntityDetailComponent.prototype.showEntityInfo = function () {
        this.panel = "entityInfo";
        this.searchPlaced = false;
    };
    EntityDetailComponent.prototype.showUpdateEntityForm = function () {
        this.entityUpdate.setValue({
            name: this.entityData.name,
            description: this.entityData.description ? this.entityData.description : null,
        });
        this.updatingEntityInfo = true;
    };
    EntityDetailComponent.prototype.updateEntity = function () {
        var _this = this;
        var entity = {
            _id: this.entityData._id,
            name: this.entityUpdate.value.name,
            description: this.entityUpdate.value.description
        };
        this.mainService.updateEntity(this.entityType, entity).subscribe(function (res) {
            _this.updatingEntityInfo = false;
            _this.entityData.name = entity.name;
            _this.entityName = entity.name;
            _this.entityData.description = entity.description;
            _this.joinLink = _env_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].frontEndUrl + "/entity/join/" + _this.entityType +
                "/" + _this.entityName + "/" + _this.entityId;
            //this.location.go("/entity/"+this.entityType+"/"+this.entityName+"/"+this.entityId);
            _this.router.navigate(["entity", _this.entityType, _this.entityName, _this.entityId]);
        });
    };
    EntityDetailComponent.prototype.discardEntityUpdate = function () {
        this.entityUpdate.reset();
        this.updatingEntityInfo = false;
    };
    EntityDetailComponent.prototype.showDocuments = function () {
        this.docsService.getEntityDocuments(this.entityType, this.entityId);
        this.panel = "documents";
        this.searchPlaced = false;
    };
    EntityDetailComponent.prototype.showAnnotations = function () {
        this.panel = "annotations";
        this.searchPlaced = false;
        // get root annotation of the entity by default
        var filter = {
            creatorName: null,
            editorName: null,
            documentId: null,
            page: null,
            parent: "root"
        };
        var queryObject = {
            keywords: "*",
            entityType: this.entityType,
            entityId: this.entityId,
            filter: filter
        };
        this.annotationsService.searchAnnotations(queryObject);
    };
    EntityDetailComponent.prototype.showAnnsSearchTips = function () {
        this.bottomSheet.open(AnnotationsSearchTipsBottomSheet);
    };
    EntityDetailComponent.prototype.search = function (event) {
        var query = event.target.value.trim();
        if (query == "") {
            this.searchPlaced = false;
            return;
        }
        this.searchPlaced = true;
        var filterStr;
        var queryObject;
        if (query.indexOf("|") > -1) {
            // if there is a pipeline, then get keywords as
            // everything before the pipeline
            var keywords = query.substr(0, query.indexOf("|")).trim();
            if (keywords === "*") {
                //this.keywordsStr = "";
            }
            else {
                //this.keywordsStr = keywords;
            }
            filterStr = query.substr(query.indexOf("|") + 1).trim();
            var filter = this.filterParse(filterStr);
            if (filter != false) {
                filter = filter;
                queryObject = {
                    keywords: keywords,
                    entityType: this.entityType,
                    entityId: this.entityId,
                    filter: filter
                };
            }
            else {
                //this.keywordsStr = "";
                // invalid filter options
                // display error message to users
                return;
            }
        }
        else {
            // keywords only, no filter options
            if (query === "*") {
                //this.keywordsStr = "";
            }
            else {
                //this.keywordsStr = query;
            }
            queryObject = {
                keywords: query,
                entityType: this.entityType,
                entityId: this.entityId,
                filter: {
                    creatorName: null,
                    editorName: null,
                    documentId: null,
                    page: null,
                    parent: null,
                }
            };
        }
        this.annotationsService.searchAnnotations(queryObject);
    };
    EntityDetailComponent.prototype.filterParse = function (filterStr) {
        // return a javascript object
        // get valid options
        var optionList = [
            "--creator-name", "--editor-name",
            "--root-only",
        ];
        // check if filterStr has any invalid options
        var possibleOptions = [];
        for (var _i = 0, _a = filterStr.split(" "); _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.startsWith("--")) {
                possibleOptions.push(s);
            }
        }
        var invalidOptions = [];
        for (var _b = 0, possibleOptions_1 = possibleOptions; _b < possibleOptions_1.length; _b++) {
            var op = possibleOptions_1[_b];
            if (optionList.indexOf(op) == -1) {
                invalidOptions.push(op);
            }
        }
        if (invalidOptions.length > 0) {
            this.message = invalidOptions[0] + " is an invalid option.";
            return false;
        }
        else {
            var filter = {
                creatorName: null,
                editorName: null,
                parent: null,
                documentId: null,
                page: null,
            };
            for (var _c = 0, possibleOptions_2 = possibleOptions; _c < possibleOptions_2.length; _c++) {
                var op = possibleOptions_2[_c];
                if (op == "--creator-name") {
                    if (this.valueOf(filterStr, op) != false) {
                        filter["creatorName"] = this.valueOf(filterStr, op);
                    }
                    else {
                        this.message = "Please supply a valid value for creatorName";
                        return;
                    }
                }
                if (op == "--editor-name") {
                    if (this.valueOf(filterStr, op) != false) {
                        filter["editorName"] = this.valueOf(filterStr, op);
                    }
                    else {
                        this.message = "Please supply a valid value for editorName";
                        return;
                    }
                }
                if (op == "--root-only") {
                    filter["parent"] = "root";
                }
            }
            this.message = "";
            return filter;
        }
    };
    EntityDetailComponent.prototype.valueOf = function (filterStr, option) {
        var list = filterStr.split(" ");
        var valueIdx = list.indexOf(option) + 1;
        if (list[valueIdx].startsWith("--")) {
            return false;
        }
        else {
            return list[valueIdx];
        }
    };
    EntityDetailComponent.prototype.displayInContext = function (ann) {
        var _this = this;
        var docIdx = -1;
        for (var _i = 0, _a = this.activatedDocs; _i < _a.length; _i++) {
            var doc = _a[_i];
            if (doc.documentId == ann.documentId) {
                docIdx = this.activatedDocs.indexOf(doc);
                break;
            }
        }
        this.annotatedPage = ann.page;
        this.nodeAnnotationId = ann._id;
        this.docDisplayMode = "viewAnns";
        if (docIdx !== -1) {
            this.openDoc(this.activatedDocs[docIdx]);
        }
        else {
            this.docsService.getDocById(ann.documentId).subscribe(function (arrayBuffer) {
                var blob = new Blob([arrayBuffer], { type: "application/pdf" });
                var docUrl = URL.createObjectURL(blob);
                var activatedDoc = {
                    title: ann.docTitle,
                    documentId: ann.documentId,
                    documentUrl: docUrl,
                };
                _this.activatedDocs.push(activatedDoc);
                //localStorage.setItem("initialDisplayedPage", ann.page)
                _this.openDoc(activatedDoc);
            });
        }
        this.sideNavOpened = false;
    };
    EntityDetailComponent.prototype.displayDoc = function (activatedDoc) {
        this.docDisplayMode = "viewDoc";
        this.annotatedPage = null;
        this.openDoc(activatedDoc);
    };
    // documents
    EntityDetailComponent.prototype.getFile = function (doc) {
        var _this = this;
        var docIdx = -1;
        for (var _i = 0, _a = this.activatedDocs; _i < _a.length; _i++) {
            var activatedDoc = _a[_i];
            if (activatedDoc.documentId === doc._id) {
                docIdx = this.activatedDocs.indexOf(activatedDoc);
                break;
            }
        }
        if (docIdx !== -1) {
            this.openDoc(this.activatedDocs[docIdx]);
        }
        else {
            this.docsService.getDocById(doc._id).subscribe(function (arrayBuffer) {
                var blob = new Blob([arrayBuffer], { type: "application/pdf" });
                var docUrl = URL.createObjectURL(blob);
                var activatedDoc = {
                    title: doc.title,
                    documentId: doc._id,
                    documentUrl: docUrl,
                };
                _this.activatedDocs.push(activatedDoc);
                _this.openDoc(activatedDoc);
            });
        }
    };
    EntityDetailComponent.prototype.openDoc = function (activatedDoc) {
        this.activeDocTitle = activatedDoc.title;
        this.activeDocId = activatedDoc.documentId;
        this.activeDocUrl = activatedDoc.documentUrl;
        this.panel = "displayDocument";
    };
    EntityDetailComponent.prototype.closeDoc = function (activatedDoc) {
        this.activatedDocs = this.activatedDocs.filter(function (item) { return item.documentId != activatedDoc.documentId; });
        this.panel = "documents";
    };
    // upload
    EntityDetailComponent.prototype.onFileSelected = function (event) {
        var file = event.target.files[0];
        // verify mimetype
        if (Object(_app_helpers_mime_type_validator__WEBPACK_IMPORTED_MODULE_7__["mimeType"])(file)) {
            this.fileTypeValid = true;
            this.uploadForm.patchValue({
                file: file,
                title: file.name
            });
            this.uploadForm.get("file").updateValueAndValidity();
            this.uploadFile();
        }
        else {
            this.fileTypeValid = false;
            /*
            this.bottomSheet.open(DocumentAlertBottomSheet, {
              data: {
                alertMessage: "We only support PDF document for now!"
              }
            });
            */
        }
    };
    EntityDetailComponent.prototype.uploadFile = function () {
        var docInfo = {
            _id: null,
            title: this.uploadForm.value.title,
            authors: this.uploadForm.value.authors,
            userId: null,
            entityType: this.entityType,
            entityId: this.entityId,
            uploadTime: Date.now(),
            fileType: this.uploadForm.value.file.type,
        };
        this.docsService.saveDocInfo(docInfo, this.uploadForm.value.file);
        this.uploadForm.reset();
    };
    EntityDetailComponent.prototype.searchDoc = function (event) {
        var keywords = event.target.value;
        if (keywords != "") {
            this.searchPlaced = true;
            var keywordsList = keywords.split(" ");
            var docsToDisplay = [];
            var cp = this.docsInEntity.slice();
            for (var _i = 0, keywordsList_1 = keywordsList; _i < keywordsList_1.length; _i++) {
                var keyword = keywordsList_1[_i];
                for (var i = 0; i < cp.length; i++) {
                    if (cp[i].title.toLowerCase().includes(keyword)) {
                        docsToDisplay.push(cp[i]);
                        cp.splice(i, 1);
                    }
                }
            }
            this.docsToDisplay = docsToDisplay;
        }
        else {
            this.searchPlaced = false;
        }
    };
    EntityDetailComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('docDisplay'),
        __metadata("design:type", _app_doc_display_doc_display_component__WEBPACK_IMPORTED_MODULE_10__["DocDisplayComponent"])
    ], EntityDetailComponent.prototype, "docDisplay", void 0);
    EntityDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-entity-detail',
            template: __webpack_require__(/*! ./entity-detail.component.html */ "./src/app/entity-detail/entity-detail.component.html"),
            styles: [__webpack_require__(/*! ./entity-detail.component.scss */ "./src/app/entity-detail/entity-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _app_entities_entities_service__WEBPACK_IMPORTED_MODULE_5__["EntitiesService"],
            _app_entity_documents_entity_documents_service__WEBPACK_IMPORTED_MODULE_6__["EntityDocumentsService"],
            _app_annotations_annotations_service__WEBPACK_IMPORTED_MODULE_9__["AnnotationsService"],
            _app_communication_service__WEBPACK_IMPORTED_MODULE_8__["CommunicationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatBottomSheet"]])
    ], EntityDetailComponent);
    return EntityDetailComponent;
}());

var AnnotationsSearchTipsBottomSheet = /** @class */ (function () {
    function AnnotationsSearchTipsBottomSheet(bottomSheetRef) {
        this.bottomSheetRef = bottomSheetRef;
    }
    AnnotationsSearchTipsBottomSheet.prototype.openLink = function (event) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    };
    AnnotationsSearchTipsBottomSheet = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./annotations-search-tips-bottom-sheet.html */ "./src/app/entity-detail/annotations-search-tips-bottom-sheet.html"),
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_11__["MatBottomSheetRef"]])
    ], AnnotationsSearchTipsBottomSheet);
    return AnnotationsSearchTipsBottomSheet;
}());



/***/ }),

/***/ "./src/app/entity-documents/entity-documents.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/entity-documents/entity-documents.service.ts ***!
  \**************************************************************/
/*! exports provided: EntityDocumentsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityDocumentsService", function() { return EntityDocumentsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EntityDocumentsService = /** @class */ (function () {
    function EntityDocumentsService(http) {
        this.http = http;
        this.apiUrl = _env_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl + "/documents";
        this.docsUpdatedSub = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.docInfoUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.closeDoc = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.docsInEntity = [];
    }
    EntityDocumentsService.prototype.docsUpdatedObs = function () {
        return this.docsUpdatedSub.asObservable();
    };
    EntityDocumentsService.prototype.getEntityDocuments = function (entityType, entityId) {
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set("entityId", entityId)
            .set("entityType", entityType);
        this.http.get(this.apiUrl + '/getEntityDocuments', { params: params }).subscribe(function (res) {
            _this.docsInEntity = res.docs;
            _this.docsUpdatedSub.next(_this.docsInEntity.slice());
        });
    };
    EntityDocumentsService.prototype.getDocById = function (docId) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set("_id", docId);
        var apiUrl = this.apiUrl + "/file";
        return this.http.get(apiUrl, {
            params: params,
            responseType: "arraybuffer"
        });
    };
    EntityDocumentsService.prototype.saveDocInfo = function (docInfo, file) {
        var _this = this;
        var realDocInfo;
        this.http.post(this.apiUrl + "/saveDocInfo", docInfo).subscribe(function (res) {
            realDocInfo = res.docInfo;
            _this.uploadDoc(realDocInfo.entityType, realDocInfo._id, file).subscribe(function (res) {
                _this.docsInEntity.push(realDocInfo);
                _this.docsUpdatedSub.next(_this.docsInEntity.slice());
            });
        });
    };
    EntityDocumentsService.prototype.uploadDoc = function (entityType, fileId, file) {
        var fileData = new FormData;
        fileData.append("entityType", entityType);
        fileData.append("fileId", fileId);
        fileData.append("file", file);
        return this.http.post(this.apiUrl + "/uploadDoc", fileData);
    };
    EntityDocumentsService.prototype.updateDoc = function (updatedDoc) {
        var _this = this;
        //index: index of the document in docsInEntity
        this.http.put(this.apiUrl + "/updateDoc", updatedDoc).subscribe(function (res) {
            _this.docInfoUpdated.next({
                documentId: updatedDoc._id,
                documentTitle: updatedDoc.title,
            });
        });
    };
    EntityDocumentsService.prototype.deleteDoc = function (docInfo) {
        var _this = this;
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]()
            .set("_id", docInfo._id)
            .set("entityType", docInfo.entityType);
        this.http.delete(this.apiUrl + "/deleteDoc", { params: params })
            .subscribe(function (res) {
            _this.docsInEntity = _this.docsInEntity.filter(function (doc) { return doc._id !== docInfo._id; });
            _this.docsUpdatedSub.next(_this.docsInEntity.slice());
        });
    };
    EntityDocumentsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], EntityDocumentsService);
    return EntityDocumentsService;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-toolbar {\n  width:100%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztDQUNaIiwiZmlsZSI6InNyYy9hcHAvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LXRvb2xiYXIge1xuICB3aWR0aDoxMDAlO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<mat-toolbar color=\"primary\">\nVersion: 0.0.1 (Beta)\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ul.nav li a, ul.nav li a:visited {\n    color: white;\n}\n\nul.nav li a:hover, ul.nav li a:active {\n  color:white;\n  background:#3D5CB0;\n}\n\nul.nav li.active a {\n  background:#3D5CB0;\n}\n\nul.navbar-right li.active a {\n  background:#3D5CB0;\n}\n\n.example-fill-remaining-space {\n  /* This fills the remaining space, by using flexbox.\n     Every toolbar row uses a flexbox row layout. */\n  flex: 1 1 auto;\n}\n\nmat-toolbar{\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtDQUNoQjs7QUFFRDtFQUNFLFlBQVk7RUFDWixtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxtQkFBbUI7Q0FDcEI7O0FBR0Q7RUFDRTtvREFDa0Q7RUFDbEQsZUFBZTtDQUNoQjs7QUFFRDtDQUNDIiwiZmlsZSI6InNyYy9hcHAvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidWwubmF2IGxpIGEsIHVsLm5hdiBsaSBhOnZpc2l0ZWQge1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxudWwubmF2IGxpIGE6aG92ZXIsIHVsLm5hdiBsaSBhOmFjdGl2ZSB7XG4gIGNvbG9yOndoaXRlO1xuICBiYWNrZ3JvdW5kOiMzRDVDQjA7XG59XG5cbnVsLm5hdiBsaS5hY3RpdmUgYSB7XG4gIGJhY2tncm91bmQ6IzNENUNCMDtcbn1cblxudWwubmF2YmFyLXJpZ2h0IGxpLmFjdGl2ZSBhIHtcbiAgYmFja2dyb3VuZDojM0Q1Q0IwO1xufVxuXG5cbi5leGFtcGxlLWZpbGwtcmVtYWluaW5nLXNwYWNlIHtcbiAgLyogVGhpcyBmaWxscyB0aGUgcmVtYWluaW5nIHNwYWNlLCBieSB1c2luZyBmbGV4Ym94LlxuICAgICBFdmVyeSB0b29sYmFyIHJvdyB1c2VzIGEgZmxleGJveCByb3cgbGF5b3V0LiAqL1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxubWF0LXRvb2xiYXJ7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n\n  <!--button mat-button color=\"white\" (click)=\"navigateToHome()\"\n  *ngIf=\"userIsAuthenticated\">\n    Home\n  </button-->\n\n  <button mat-button color=\"white\" (click)=\"navigateToClasses()\"\n  *ngIf=\"userIsAuthenticated\">\n    Classes\n  </button>\n\n  <button mat-button color=\"white\" (click)=\"navigateToGroups()\"\n  *ngIf=\"userIsAuthenticated\">\n    Groups\n  </button>\n\n\n  <button mat-button color=\"white\" (click)=\"navigateToMyLibrary()\"\n  *ngIf=\"userIsAuthenticated\">\n    My Library\n  </button>\n\n  <span class=\"example-fill-remaining-space\">\n  </span>\n\n  <button mat-button color=\"white\" (click)=\"navigateToSF()\"\n  *ngIf=\"userIsAuthenticated\">\n    Support\n  </button>\n\n  <button mat-button [matMenuTriggerFor]=\"menu\"\n  *ngIf=\"userIsAuthenticated\">\n    Manage\n  </button>\n  <mat-menu #menu=\"matMenu\">\n    <button mat-menu-item (click)=\"navigateToProfile()\">My Profile</button>\n    <button mat-menu-item (click)=\"logout()\">Logout</button>\n  </mat-menu>\n\n\n  <button mat-button color=\"white\" (click)=\"navigateToLogin()\"\n  *ngIf=\"!userIsAuthenticated\">\n    Login\n  </button>\n\n  <button mat-button color=\"white\" (click)=\"navigateToSignUp()\"\n  *ngIf=\"!userIsAuthenticated\">\n    Sign-Up\n  </button>\n\n  <!--button mat-button color=\"white\" (click)=\"toTutorial()\">\n    Tutorials\n  </button-->\n\n\n\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.userIsAuthenticated = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.authStatus
            .subscribe(function (isAuthenticated) {
            _this.userIsAuthenticated = isAuthenticated;
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    HeaderComponent.prototype.navigateToSF = function () {
        this.router.navigate(["/support-feedbacks"]);
    };
    HeaderComponent.prototype.navigateToHome = function () {
        this.router.navigate(["/home"]);
    };
    HeaderComponent.prototype.navigateToClasses = function () {
        this.router.navigate(["/entity/classes"]);
    };
    HeaderComponent.prototype.navigateToGroups = function () {
        this.router.navigate(["/entity/groups"]);
    };
    HeaderComponent.prototype.navigateToProfile = function () {
        this.router.navigate(["/profile"]);
    };
    HeaderComponent.prototype.navigateToLogin = function () {
        this.router.navigate(["/login"]);
    };
    HeaderComponent.prototype.navigateToSignUp = function () {
        this.router.navigate(["/signup"]);
    };
    HeaderComponent.prototype.navigateToMyLibrary = function () {
        this.router.navigate(["my-library"]);
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.authListenerSubs.unsubscribe();
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/helpers/mime-type.validator.ts":
/*!************************************************!*\
  !*** ./src/app/helpers/mime-type.validator.ts ***!
  \************************************************/
/*! exports provided: mimeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mimeType", function() { return mimeType; });
// simple mimetype check for MVP
var mimeType = function (file) {
    //const file = control.value as File;
    var admissibleTypes = [
        "application/pdf",
    ];
    if (admissibleTypes.indexOf(file.type) > -1) {
        return true;
    }
    else {
        return false;
    }
};
/*
export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  console.log("from line 11 mimetype", file);
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "25504446":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        //console.log("The mimetype of the file is ", head)
        if (isValid) {
          observer.next(null);
        } else {
          console.log("file tyle is not in pdf");
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};



export const mimeType = (
  control: AbstractControl
): Observable<{ [key: string]: any }> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(
          control.value.result
        ).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "25504446":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        //console.log("The mimetype of the file is ", head)
        if (isValid) {
          observer.next({validMimeType: true});
        } else {
          observer.next({validMimeTyle: false});
        }
        observer.complete();
      });
      //fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};

*/


/***/ }),

/***/ "./src/app/my-library/my-library.component.css":
/*!*****************************************************!*\
  !*** ./src/app/my-library/my-library.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  margin-top:5%;\n  width:800px;\n  margin:auto;\n}\n\n.sidenav {\n  float:left;\n}\n\n.content {\n  margin-left:50%;\n}\n\nmat-expansion-panel{\n  margin:1%;\n}\n\nmat-form-field,\ninput {\n  width: 100%;\n}\n\nmat-spinner {\n  margin: auto;\n}\n\ninput[type=\"file\"] {\n  visibility: hidden;\n}\n\n#open{\n  margin-left:0%;\n}\n\n#edit{\n  margin-left:30%;\n}\n\n#delete{\n  float:right;\n}\n\nmat-card{\n  margin-top:2%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbXktbGlicmFyeS9teS1saWJyYXJ5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0VBQ2QsWUFBWTtFQUNaLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLFdBQVc7Q0FDWjs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7QUFFRDtFQUNFLFVBQVU7Q0FDWDs7QUFFRDs7RUFFRSxZQUFZO0NBQ2I7O0FBR0Q7RUFDRSxhQUFhO0NBQ2Q7O0FBRUQ7RUFDRSxtQkFBbUI7Q0FDcEI7O0FBRUQ7RUFDRSxlQUFlO0NBQ2hCOztBQUVEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UsWUFBWTtDQUNiOztBQUVEO0VBQ0UsY0FBYztDQUNmIiwiZmlsZSI6InNyYy9hcHAvbXktbGlicmFyeS9teS1saWJyYXJ5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbiB7XG4gIG1hcmdpbi10b3A6NSU7XG4gIHdpZHRoOjgwMHB4O1xuICBtYXJnaW46YXV0bztcbn1cblxuLnNpZGVuYXYge1xuICBmbG9hdDpsZWZ0O1xufVxuXG4uY29udGVudCB7XG4gIG1hcmdpbi1sZWZ0OjUwJTtcbn1cblxubWF0LWV4cGFuc2lvbi1wYW5lbHtcbiAgbWFyZ2luOjElO1xufVxuXG5tYXQtZm9ybS1maWVsZCxcbmlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cblxubWF0LXNwaW5uZXIge1xuICBtYXJnaW46IGF1dG87XG59XG5cbmlucHV0W3R5cGU9XCJmaWxlXCJdIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4jb3BlbntcbiAgbWFyZ2luLWxlZnQ6MCU7XG59XG5cbiNlZGl0e1xuICBtYXJnaW4tbGVmdDozMCU7XG59XG5cbiNkZWxldGV7XG4gIGZsb2F0OnJpZ2h0O1xufVxuXG5tYXQtY2FyZHtcbiAgbWFyZ2luLXRvcDoyJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/my-library/my-library.component.html":
/*!******************************************************!*\
  !*** ./src/app/my-library/my-library.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  works\n</p>\n"

/***/ }),

/***/ "./src/app/my-library/my-library.component.ts":
/*!****************************************************!*\
  !*** ./src/app/my-library/my-library.component.ts ***!
  \****************************************************/
/*! exports provided: MyLibraryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyLibraryComponent", function() { return MyLibraryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyLibraryComponent = /** @class */ (function () {
    function MyLibraryComponent(route, router, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
    }
    MyLibraryComponent.prototype.ngOnInit = function () {
    };
    MyLibraryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-my-library',
            template: __webpack_require__(/*! ./my-library.component.html */ "./src/app/my-library/my-library.component.html"),
            styles: [__webpack_require__(/*! ./my-library.component.css */ "./src/app/my-library/my-library.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], MyLibraryComponent);
    return MyLibraryComponent;
}());



/***/ }),

/***/ "./src/app/pipes/highlight-keywords.pipe.ts":
/*!**************************************************!*\
  !*** ./src/app/pipes/highlight-keywords.pipe.ts ***!
  \**************************************************/
/*! exports provided: HighlightKeywordsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlightKeywordsPipe", function() { return HighlightKeywordsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HighlightKeywordsPipe = /** @class */ (function () {
    function HighlightKeywordsPipe() {
    }
    HighlightKeywordsPipe.prototype.transform = function (value, keywordsStr) {
        keywordsStr = String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), keywordsStr);
        console.log("value is", value);
        if (keywordsStr != "") {
            var keywords = keywordsStr.split(" ");
            //highlightedText = value.split(keyword).join("<mark>"+keyword+"</mark>");
            for (var _i = 0, keywords_1 = keywords; _i < keywords_1.length; _i++) {
                var keyword = keywords_1[_i];
                var regex = new RegExp(keyword, 'gi');
                // find all matched str in value ignore cases
                var found = value.match(regex);
                if (found != null) {
                    for (var _a = 0, found_1 = found; _a < found_1.length; _a++) {
                        var match = found_1[_a];
                        value = value.split(match).join("<mark>" + match + "</mark>");
                    }
                }
            }
            return value;
        }
        else {
            return value;
        }
    };
    HighlightKeywordsPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'highlightKeywords'
        })
    ], HighlightKeywordsPipe);
    return HighlightKeywordsPipe;
}());

var templateObject_1;


/***/ }),

/***/ "./src/app/pipes/shorten.pipe.ts":
/*!***************************************!*\
  !*** ./src/app/pipes/shorten.pipe.ts ***!
  \***************************************/
/*! exports provided: ShortenPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShortenPipe", function() { return ShortenPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ShortenPipe = /** @class */ (function () {
    function ShortenPipe() {
    }
    ShortenPipe.prototype.transform = function (value, limit) {
        if (value.length > limit) {
            return value.substr(0, limit) + "...";
        }
        return value;
    };
    ShortenPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'shorten'
        })
    ], ShortenPipe);
    return ShortenPipe;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.css":
/*!***********************************************!*\
  !*** ./src/app/profile/profile.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#field{\n  width: 100%\n}\n\n#profile {\n  margin-left:35%;\n  margin-top: 5%;\n  width: 30%;\n}\n\n.alert alert-danger{\n  height: 20%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0NBQ1o7O0FBRUQ7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLFdBQVc7Q0FDWjs7QUFFRDtFQUNFLFlBQVk7Q0FDYiIsImZpbGUiOiJzcmMvYXBwL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2ZpZWxke1xuICB3aWR0aDogMTAwJVxufVxuXG4jcHJvZmlsZSB7XG4gIG1hcmdpbi1sZWZ0OjM1JTtcbiAgbWFyZ2luLXRvcDogNSU7XG4gIHdpZHRoOiAzMCU7XG59XG5cbi5hbGVydCBhbGVydC1kYW5nZXJ7XG4gIGhlaWdodDogMjAlO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/profile/profile.component.html":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <div *ngIf=\"successMessage\" class=\"alert alert-success\">\n    <p style=\"margin:auto\">{{ successMessage }}</p>\n    <m\n  </div>\n  <div class=\"alter alert-danger\">\n    <p style=\"margin:auto\">{{ errorMessage }}</p>\n  </div>\n\n\n\n  <div id=\"profile\">\n  <form [formGroup]=\"form\" (submit)=\"onSaveUpdates()\" >\n    <mat-form-field id=\"field\">\n      <input matInput type=\"text\" formControlName=\"firstName\"\n      placeholder=\"First Name\">\n      <mat-error *ngIf=\"form.get('firstName').invalid\">\n        Please enter your first name\n      </mat-error>\n    </mat-form-field>\n    <br>\n    <mat-form-field id=\"field\">\n      <input matInput type=\"text\" formControlName=\"lastName\"\n      placeholder=\"Last Name\">\n      <mat-error *ngIf=\"form.get('lastName').invalid\">\n        Please enter your last name\n      </mat-error>\n    </mat-form-field>\n    <br>\n    <mat-form-field id=\"field\">\n      <input matInput type=\"text\" formControlName=\"userName\"\n      placeholder=\"User Name\">\n      <mat-error *ngIf=\"form.get('userName').invalid\">\n        Please enter a user name\n      </mat-error>\n    </mat-form-field>\n    <br>\n    <mat-form-field id=\"field\">\n      <input matInput type=\"email\" formControlName=\"email\"\n      placeholder=\"E-mail\">\n      <mat-error *ngIf=\"form.get('email').invalid\">\n        Please enter a valid email\n      </mat-error>\n    </mat-form-field>\n    <br>\n    <mat-form-field id=\"field\">\n      <input matInput type=\"text\" formControlName=\"affiliation\"\n      placeholder=\"Please enter your institute\">\n      <mat-error *ngIf=\"form.get('affiliation').invalid\">\n        Please enter your institute\n      </mat-error>\n    </mat-form-field>\n  </form>\n\n  <div>\n    <button mat-stroked-button color=\"primary\"\n    (click)=\"onSaveUpdates()\">\n      Save Updates\n    </button>\n\n    <button mat-stroked-button color=\"primary\"\n    style=\"float:right\"\n    (click)=\"onClickChangePassword()\">\n      Change password\n    </button>\n  </div>\n\n\n  <form [formGroup]=\"passwordUpdateForm\"\n    *ngIf=\"showChangePsd\" (submit)=\"updatePassword()\">\n    <mat-form-field>\n      <input matInput type=\"password\" formControlName=\"currentPassword\"\n      placeholder=\"Current password\">\n    </mat-form-field>\n    <br>\n    <mat-form-field>\n      <input matInput type=\"password\" formControlName=\"newPassword\"\n      placeholder=\"New password\">\n    </mat-form-field>\n    <mat-error *ngIf=\"passwordUpdateForm.get('newPassword').invalid\">\n      A valid password must have at least six characters\n    </mat-error>\n\n    <br>\n    <mat-form-field>\n      <input matInput type=\"password\" formControlName=\"reNewPassword\"\n      placeholder=\"Re-type new password\">\n    </mat-form-field>\n    <br>\n\n\n    <button mat-stroked-button color=\"primary\"\n    (click)=\"updatePassword()\">\n      Save new password\n    </button>\n\n  </form>\n\n</div>\n"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
// This component is used to update user infomation
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(http, authService, route, router) {
        this.http = http;
        this.authService = authService;
        this.route = route;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            }),
            lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required] }),
            userName: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required] }),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required] }),
            affiliation: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required] }),
        });
        this.passwordUpdateForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            currentPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required] }),
            newPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].passwordMinLength)] }),
            reNewPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null),
        });
        this.authService.fetchUserInfo()
            .subscribe(function (response) {
            _this.form.setValue({
                firstName: response.firstName,
                lastName: response.lastName,
                userName: response.userName,
                email: response.email,
                affiliation: response.affiliation,
            });
        }, function (error) {
            console.log(error);
        });
    };
    ProfileComponent.prototype.onSaveUpdates = function () {
        var _this = this;
        var updatedInfo = {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            userName: this.form.value.userName,
            email: this.form.value.email,
            affiliation: this.form.value.affiliation,
        };
        this.authService.updateOneUser(updatedInfo)
            .subscribe(function (response) {
            _this.errorMessage = "";
            _this.successMessage = "Updates Successfully Saved!";
            _this.authService.setUserName(_this.form.value.userName);
        }, function (error) {
            _this.successMessage = "";
            _this.errorMessage = error.error.message;
        });
    };
    ProfileComponent.prototype.onClickChangePassword = function () {
        this.showChangePsd = !this.showChangePsd;
        this.successMessage = "";
        this.errorMessage = "";
    };
    ProfileComponent.prototype.updatePassword = function () {
        var _this = this;
        if (this.passwordUpdateForm.get('newPassword').invalid) {
            return;
        }
        var formValue = this.passwordUpdateForm.value;
        if (formValue.newPassword == formValue.reNewPassword) {
            this.authService.updatePassword(formValue.currentPassword, formValue.newPassword)
                .subscribe(function (response) {
                _this.errorMessage = "";
                _this.successMessage = "password has been successfully updated";
            }, function (error) {
                _this.successMessage = "";
                _this.errorMessage = "Current password is incorrect";
            });
        }
        else {
            this.successMessage = "";
            this.errorMessage = "Re-typed password does not match the new password";
        }
        this.passwordUpdateForm.reset();
    };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/support-feedback/support-feedback.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/support-feedback/support-feedback.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  margin-top:5%;\n}\n\n#ticket {\n  background: #eee;\n  width:50%;\n  margin:auto;\n}\n\n#content {\n  width:100%;\n}\n\n#name {\n  width:40%;\n}\n\n#email{\n  width:40%;\n  margin-left:20%;\n}\n\nmat-card-footer, h4 {\n  margin:5%;\n}\n\n.example-fill-remaining-space {\n  /* This fills the remaining space, by using flexbox.\n     Every toolbar row uses a flexbox row layout. */\n  flex: 1 1 auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3VwcG9ydC1mZWVkYmFjay9zdXBwb3J0LWZlZWRiYWNrLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0NBQ2Y7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsVUFBVTtFQUNWLFlBQVk7Q0FDYjs7QUFBQztFQUNBLFdBQVc7Q0FDWjs7QUFFRDtFQUNFLFVBQVU7Q0FDWDs7QUFFRDtFQUNFLFVBQVU7RUFDVixnQkFBZ0I7Q0FDakI7O0FBQ0Q7RUFDRSxVQUFVO0NBQ1g7O0FBR0Q7RUFDRTtvREFDa0Q7RUFDbEQsZUFBZTtDQUNoQiIsImZpbGUiOiJzcmMvYXBwL3N1cHBvcnQtZmVlZGJhY2svc3VwcG9ydC1mZWVkYmFjay5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4ge1xuICBtYXJnaW4tdG9wOjUlO1xufVxuXG4jdGlja2V0IHtcbiAgYmFja2dyb3VuZDogI2VlZTtcbiAgd2lkdGg6NTAlO1xuICBtYXJnaW46YXV0bztcbn0gI2NvbnRlbnQge1xuICB3aWR0aDoxMDAlO1xufVxuXG4jbmFtZSB7XG4gIHdpZHRoOjQwJTtcbn1cblxuI2VtYWlse1xuICB3aWR0aDo0MCU7XG4gIG1hcmdpbi1sZWZ0OjIwJTtcbn1cbm1hdC1jYXJkLWZvb3RlciwgaDQge1xuICBtYXJnaW46NSU7XG59XG5cblxuLmV4YW1wbGUtZmlsbC1yZW1haW5pbmctc3BhY2Uge1xuICAvKiBUaGlzIGZpbGxzIHRoZSByZW1haW5pbmcgc3BhY2UsIGJ5IHVzaW5nIGZsZXhib3guXG4gICAgIEV2ZXJ5IHRvb2xiYXIgcm93IHVzZXMgYSBmbGV4Ym94IHJvdyBsYXlvdXQuICovXG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/support-feedback/support-feedback.component.html":
/*!******************************************************************!*\
  !*** ./src/app/support-feedback/support-feedback.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--mat-toolbar>\n  <button mat-button color=\"primary\" (click)=\"createNewTicket()\">\n    <mat-icon>add</mat-icon>\n    <span>New Ticket</span>\n  </button>\n</mat-toolbar-->\n\n<div class=main>\n\n<mat-card id=\"ticket\">\n  <h3 class=\"text text-info\">\n    How can we help?\n  </h3>\n\n  <mat-card-content>\n  <form [formGroup]=\"ticketForm\">\n      <mat-form-field id=\"content\">\n        <textarea matInput rows=\"20\" formControlName=\"content\"\n          placeholder=\"Question or feedback\">\n        </textarea>\n        <mat-error *ngIf=\"ticketForm.get('content').invalid\">\n          Ticket cannot be empty\n        </mat-error>\n      </mat-form-field>\n\n\n      <mat-form-field id=\"name\">\n        <input matInput formControlName=\"name\"\n          placeholder=\"Your name\">\n        <mat-error *ngIf=\"ticketForm.get('name').invalid\">\n          Please fill your name\n        </mat-error>\n      </mat-form-field>\n\n\n      <mat-form-field id=\"email\">\n        <input matInput formControlName=\"userEmail\"\n        placeholder=\"Your email\">\n        <mat-error *ngIf=\"ticketForm.get('userEmail').invalid\">\n          Please fill your email\n        </mat-error>\n      </mat-form-field>\n\n    </form>\n  </mat-card-content>\n\n  <br>\n\n  <mat-card-actions>\n    <button mat-button color=\"primary\"\n    (click)=\"createTicket()\">\n      Submit\n    </button>\n\n    <button mat-button color=\"warn\"\n    (click)=\"discard()\">\n      Discard\n    </button>\n  </mat-card-actions>\n\n  <mat-card-footer>\n    <h4 class=\"text text-success\">\n      {{message}}\n    </h4>\n  </mat-card-footer>\n\n</mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/support-feedback/support-feedback.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/support-feedback/support-feedback.component.ts ***!
  \****************************************************************/
/*! exports provided: SupportFeedbackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportFeedbackComponent", function() { return SupportFeedbackComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _support_feedback_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./support-feedback.service */ "./src/app/support-feedback/support-feedback.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SupportFeedbackComponent = /** @class */ (function () {
    function SupportFeedbackComponent(mainService) {
        this.mainService = mainService;
        this.tickets = [];
    }
    SupportFeedbackComponent.prototype.ngOnInit = function () {
        this.ticketForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            content: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            }),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            }),
            userEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            }),
        });
    };
    SupportFeedbackComponent.prototype.createTicket = function () {
        var _this = this;
        if (this.ticketForm.invalid) {
            console.log("Form invalid");
            return;
        }
        var newTicket = {
            _id: null,
            content: this.ticketForm.value.content,
            userEmail: this.ticketForm.value.userEmail,
            fullname: this.ticketForm.value.name,
        };
        this.mainService.createTicket(newTicket).subscribe(function (res) {
            _this.message = "Thank you creating the support ticket, we will get back" +
                " to you soon!";
            _this.ticketForm.reset();
        });
    };
    SupportFeedbackComponent.prototype.discard = function () {
        this.ticketForm.reset();
        this.message = "";
    };
    SupportFeedbackComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-support-feedback',
            template: __webpack_require__(/*! ./support-feedback.component.html */ "./src/app/support-feedback/support-feedback.component.html"),
            styles: [__webpack_require__(/*! ./support-feedback.component.css */ "./src/app/support-feedback/support-feedback.component.css")]
        }),
        __metadata("design:paramtypes", [_support_feedback_service__WEBPACK_IMPORTED_MODULE_2__["SupportFeedbackService"]])
    ], SupportFeedbackComponent);
    return SupportFeedbackComponent;
}());



/***/ }),

/***/ "./src/app/support-feedback/support-feedback.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/support-feedback/support-feedback.service.ts ***!
  \**************************************************************/
/*! exports provided: SupportFeedbackService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportFeedbackService", function() { return SupportFeedbackService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SupportFeedbackService = /** @class */ (function () {
    function SupportFeedbackService(http) {
        this.http = http;
        this.apiUrl = _env_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + "/tickets/";
    }
    SupportFeedbackService.prototype.createTicket = function (ticket) {
        return this.http.post(this.apiUrl + "createTicket", ticket);
    };
    SupportFeedbackService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], SupportFeedbackService);
    return SupportFeedbackService;
}());



/***/ }),

/***/ "./src/app/tutorials/tutorials.component.css":
/*!***************************************************!*\
  !*** ./src/app/tutorials/tutorials.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n  width: 100%;\n  height: 1000px;\n} mat-drawer {\n  width: 200px;\n} h3 {\n  margin-left: 10%;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdHV0b3JpYWxzL3R1dG9yaWFscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLGVBQWU7Q0FDaEIsQ0FBQztFQUNBLGFBQWE7Q0FDZCxDQUFDO0VBQ0EsaUJBQWlCO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvdHV0b3JpYWxzL3R1dG9yaWFscy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwMHB4O1xufSBtYXQtZHJhd2VyIHtcbiAgd2lkdGg6IDIwMHB4O1xufSBoMyB7XG4gIG1hcmdpbi1sZWZ0OiAxMCU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/tutorials/tutorials.component.html":
/*!****************************************************!*\
  !*** ./src/app/tutorials/tutorials.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<mat-drawer-container class=\"example-container\">\n  <mat-drawer mode=\"side\" opened >\n    <h3 class=\"text text-info\">\n      App list\n    </h3>\n\n    <mat-nav-list>\n      <a mat-list-item (click)=\"showMyLibrary()\">\n        My Library\n      </a>\n      <a mat-list-item (click)=\"showGroups()\">\n        Groups\n      </a>\n      <a mat-list-item (click)=\"showClasses()\">\n        Classes\n      </a>\n    </mat-nav-list>\n\n  </mat-drawer>\n\n  <mat-drawer-content>\n    <div *ngIf=\"panel==='myLibrary'\">\n\n\n    </div>\n\n    <div *ngIf=\"panel==='groups'\">\n      <b>Groups</b> is an app that enable users in the same\n      <b>Group</b> to share annotations amongst each other.\n\n      To create a group,\n      <ul>\n        <li>\n          Click on \"Groups\" in the above toolbar.\n        </li>\n        <li>\n          Then click on \"Create a group\".\n        </li>\n        <li>\n          After filling out \"group name\" and \"description\",\n          click \"Create group\"\n        </li>\n      </ul>\n    </div>\n\n    <div *ngIf=\"panel==='classes'\">\n\n    </div>\n  </mat-drawer-content>\n\n</mat-drawer-container>\n\n\n\n\n\n\n<p>\n  tutorials works!\n</p>\n    <mat-tab-group>\n      <mat-tab label=\"Researcher\">\n\n        Add collegues to your group\n        Upload a document\n        Make\n\n        <mat-tab-group>\n          <mat-tab>\n            Create a group\n          </mat-tab>\n\n          <mat-tab>\n            Add collegues to your group\n          </mat-tab>\n\n        </mat-tab-group>\n\n\n\n      </mat-tab>\n\n      <mat-tab label=\"Instructor\">\n        Create a class\n\n        Add all your students to the class\n\n        Help students walk through lecture\n        materials\n\n        Students can help each other\n      </mat-tab>\n\n      <mat-tab label=\"Student\">\n        Create a study group\n        Add your friends\n\n\n\n      </mat-tab>\n    </mat-tab-group>\n"

/***/ }),

/***/ "./src/app/tutorials/tutorials.component.ts":
/*!**************************************************!*\
  !*** ./src/app/tutorials/tutorials.component.ts ***!
  \**************************************************/
/*! exports provided: TutorialsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorialsComponent", function() { return TutorialsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TutorialsComponent = /** @class */ (function () {
    function TutorialsComponent() {
    }
    TutorialsComponent.prototype.ngOnInit = function () {
    };
    TutorialsComponent.prototype.showMyLibrary = function () {
        this.panel = "myLibrary";
    };
    TutorialsComponent.prototype.showGroups = function () {
        this.panel = "groups";
    };
    TutorialsComponent.prototype.showClasses = function () {
        this.panel = "classes";
    };
    TutorialsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tutorials',
            template: __webpack_require__(/*! ./tutorials.component.html */ "./src/app/tutorials/tutorials.component.html"),
            styles: [__webpack_require__(/*! ./tutorials.component.css */ "./src/app/tutorials/tutorials.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TutorialsComponent);
    return TutorialsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    apiUrl: "http://localhost:3000/api",
    frontEndUrl: "http://localhost:4200",
    production: false,
    userIdLength: 30,
    groupIdLength: 50,
    threadIdLength: 10,
    responseIdLength: 10,
    passwordMinLength: 6,
    strokeStyle: "#00b8e6",
    globalAlpha: 0.2,
    lineWidth: 20,
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /scr1/li108/CodingEx/interpolate/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** zlib (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map