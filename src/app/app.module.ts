import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
//import { PdfViewerComponent} from "./pdf-viewer/pdf-viewer.component";
import { PdfViewerModule } from "ng2-pdf-viewer";

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
  MatListModule
} from '@angular/material';

import { MatIconModule } from "@angular/material/icon";

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from "@angular/material/sidenav";

import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptor } from "./auth/auth-interceptor";

import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupsService } from "./groups/groups.service";

import { AppRoutingModule } from './app-routing.module';
import { GroupLitOpenComponent } from
'./groups/group-detail/group-lits/group-lit-open/group-lit-open.component';

import { MathJaxDirective } from "./directives/mathjax.directive";
import { GroupLitsComponent } from './groups/group-detail/group-lits/group-lits.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { ClassesComponent } from './classes/classes.component';
import { GroupThreadsMgtComponent } from './groups/group-detail/group-threads-mgt/group-threads-mgt.component';
import { GroupLitThreadsMgmtComponent } from
'@group-lit-threads-mgmt/group-lit-threads-mgmt.component';
import { GroupLitThreadCreateComponent } from
'@group-lit-threads-mgmt/group-lit-thread-create/group-lit-thread-create.component';
import { GroupLitThreadsListComponent } from
'@group-lit-threads-mgmt/group-lit-threads-list/group-lit-threads-list.component';
import { GroupLitThreadUpdateComponent } from './groups/group-detail/group-lits/group-lit-open/group-lit-threads-mgmt/group-lit-thread-update/group-lit-thread-update.component';
import { GroupLitSingleThreadComponent } from './groups/group-detail/group-lits/group-lit-open/group-lit-threads-mgmt/group-lit-single-thread/group-lit-single-thread.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { GroupLitThreadsSearchComponent } from './groups/group-detail/group-lits/group-lit-open/group-lit-threads-mgmt/group-lit-threads-search/group-lit-threads-search.component';
import { HighlightKeywordsPipe } from './pipes/highlight-keywords.pipe';
import { LitOpenComponent } from './my-library/lit-open/lit-open.component';

/*
import { LitsComponent } from './personal/lits/lits.component';
import { LitsService } from './personal/lits/lits.service';
import { LitOpenComponent } from './personal/lits/lit-open/lit-open.component';
import { ThreadsService } from './personal/threads/threads.service';
import { ThreadsComponent } from './personal/threads/threads/threads.component';
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GroupsComponent,
    //LitsComponent,
    //LitOpenComponent,
    //ThreadsComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    GroupDetailComponent,
    GroupLitOpenComponent,
    MathJaxDirective,
    GroupLitsComponent,
    UsersComponent,
    HomeComponent,
    FooterComponent,
    MyLibraryComponent,
    ClassesComponent,
    GroupThreadsMgtComponent,
    GroupLitThreadsMgmtComponent,
    GroupLitThreadCreateComponent,
    GroupLitThreadsListComponent,
    GroupLitThreadUpdateComponent,
    GroupLitSingleThreadComponent,
    ShortenPipe,
    GroupLitThreadsSearchComponent,
    HighlightKeywordsPipe,
    LitOpenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
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
    MatListModule
  ],
  providers: [
    GroupsService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
