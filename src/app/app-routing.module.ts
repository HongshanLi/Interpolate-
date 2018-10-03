import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups/groups.component';
//import { LitsComponent } from './personal/lits/lits.component';
//import { LitOpenComponent } from './personal/lits/lit-open/lit-open.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth-guard';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupLitsComponent } from "./groups/group-lits/group-lits.component";
import { GroupLitOpenComponent } from "./groups/group-lits/group-lit-open/group-lit-open.component";
import {
  GroupThreadsListComponent
}
from "./groups/group-threads-list/group-threads-list.component";

import { HomeComponent } from "@app/home/home.component";
import { MyLibraryComponent } from "@app/my-library/my-library.component";

/*
const appRoutes: Routes = [
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'lits', component: LitsComponent, canActivate: [AuthGuard] },
  // route to open a lit
  { path: 'lits/:litPath/:page', component: LitOpenComponent, canActivate: [AuthGuard]},
  //route to update the lit info
  { path: 'lits/:litPath', component: LitUpdateComponent, canActivate: [AuthGuard]},
  //{ path: 'lits/:litPath/:page/create', component: ThreadCreateComponent},
  { path: 'lits/:litPath/:page/:threadId', component: LitOpenComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];
*/

// Dont guard the route during development
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  { path: 'groups/:groupId', component: GroupDetailComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent},
  { path: 'signup/:groupId', component: SignupComponent },
  { path: 'login/:groupId', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'groups/:groupId/:litId', component: GroupLitOpenComponent, canActivate: [AuthGuard]},
  { path: 'my-library', component: MyLibraryComponent, canActivate: [AuthGuard]}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
