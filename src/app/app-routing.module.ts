import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups/groups.component';
//import { LitsComponent } from './personal/lits/lits.component';
//import { LitOpenComponent } from './personal/lits/lit-open/lit-open.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth-guard';

import { JoinAGroupComponent } from "./groups/join-a-group/join-a-group.component";
import { MyLibraryComponent } from "@app/my-library/my-library.component";


import { ClassesComponent } from "@app/classes/classes.component";
import { EntityDetailComponent } from
"@app/entity-detail/entity-detail.component";

import { DocDisplayComponent } from
'@app/doc-display/doc-display.component'


const appRoutes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  {
    path: 'my-library', component: EntityDetailComponent,
    canActivate: [AuthGuard]
  },

  {
    path: ':entityType/:entityName/:entityId',
    component: EntityDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':entityType/:entityName/:entityId/:documentId',
    component: DocDisplayComponent,
    canActivate: [AuthGuard]
  }
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
