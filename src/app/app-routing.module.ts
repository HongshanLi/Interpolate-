import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { LitsComponent } from './personal/lits/lits.component';
//import { LitOpenComponent } from './personal/lits/lit-open/lit-open.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth-guard';

import { MyLibraryComponent } from "@app/my-library/my-library.component";

import { EntitiesComponent } from "@app/entities/entities.component";
import { EntityDetailComponent } from
"@app/entity-detail/entity-detail.component";

import { DocDisplayComponent } from
'@app/doc-display/doc-display.component'
import { TutorialsComponent } from "@app/tutorials/tutorials.component";

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: "profile", component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'my-library', component: EntityDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'entity/:entityType',
    component: EntitiesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'entity/:entityType/:entityName/:entityId',
    component: EntityDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'entity/join/:entityType/:entityName/:entityId',
    component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent,
  },
  {
    path: 'tutorials', component: TutorialsComponent,
  }

]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
