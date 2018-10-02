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
  MatProgressSpinnerModule
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
import { GroupLitOpenComponent } from './groups/group-lits/group-lit-open/group-lit-open.component';
import { GroupThreadsListComponent } from './groups/group-threads-list/group-threads-list.component';

import { MathJaxDirective } from "./directives/mathjax.directive";
import { GroupLitsComponent } from './groups/group-lits/group-lits.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

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
    GroupThreadsListComponent,
    MathJaxDirective,
    GroupLitsComponent,
    UsersComponent,
    SearchComponent,
    HomeComponent,
    FooterComponent,
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
    MatSidenavModule
  ],
  providers: [
    GroupsService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
