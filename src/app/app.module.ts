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
  MatListModule,
  MatTabsModule,
  MatPaginatorModule
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

import { AppRoutingModule } from './app-routing.module';

import { MathJaxDirective } from "./directives/mathjax.directive";
import { UsersComponent } from './users/users.component';
import { FooterComponent } from './footer/footer.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { ClassesComponent } from './classes/classes.component';

import { ShortenPipe } from './pipes/shorten.pipe';
import { HighlightKeywordsPipe } from './pipes/highlight-keywords.pipe';
import { EntityCreateComponent } from './entity-create/entity-create.component';
import { EntitiesComponent } from './entities/entities.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GroupsComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    MathJaxDirective,
    GroupLitsComponent,
    UsersComponent,
    HomeComponent,
    FooterComponent,
    MyLibraryComponent,
    ClassesComponent,
    ShortenPipe,
    HighlightKeywordsPipe,
    JoinAGroupComponent,
    EntityCreateComponent,
    EntitiesComponent,
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
    MatListModule,
    MatTabsModule,
    MatPaginatorModule
  ],
  providers: [
    GroupsService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
