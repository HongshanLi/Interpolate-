import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatListModule,
  MatTabsModule,
  MatPaginatorModule,
  MatStepperModule,
  MatButtonToggleModule,
  MatBottomSheetModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatBadgeModule,
  MatRadioModule,
} from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptor } from "./auth/auth-interceptor";

import { AppRoutingModule } from './app-routing.module';

import { MathJaxDirective } from "./directives/mathjax.directive";
import { FooterComponent } from './footer/footer.component';
import { MyLibraryComponent } from './my-library/my-library.component';

import { ShortenPipe } from './pipes/shorten.pipe';
import { HighlightKeywordsPipe } from './pipes/highlight-keywords.pipe';
import { EntitiesComponent } from './entities/entities.component';
import { EntityDetailComponent,
AnnotationsSearchTipsBottomSheet } from "./entity-detail/entity-detail.component";

import {
  DocDisplayComponent,
//  DocsInEntityBottomSheet,
//  DocumentAlertBottomSheet
} from "./doc-display/doc-display.component";

import { AnnotationsComponent,
AnnotationsComponentTipsBottomSheet } from "./annotations/annotations.component";
import { HighlightDirective } from './directives/highlight.directive';

import 'hammerjs';
import { GetPositionDirective } from './directives/get-position.directive';
import { TutorialsComponent } from './tutorials/tutorials.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    MathJaxDirective,
    FooterComponent,
    MyLibraryComponent,
    ShortenPipe,
    HighlightKeywordsPipe,
    EntitiesComponent,
    EntityDetailComponent,
    DocDisplayComponent,
    //DocsInEntityBottomSheet,
    //DocumentAlertBottomSheet,
    AnnotationsComponent,
    HighlightDirective,
    GetPositionDirective,
    TutorialsComponent,
    AnnotationsSearchTipsBottomSheet,
    AnnotationsComponentTipsBottomSheet,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatTabsModule,
    MatPaginatorModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatListModule,
    MatBadgeModule,
    MatRadioModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  entryComponents:[
    AnnotationsSearchTipsBottomSheet,
    AnnotationsComponentTipsBottomSheet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
