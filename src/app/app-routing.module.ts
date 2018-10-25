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
import { GroupLitsComponent } from "./groups/group-detail/group-lits/group-lits.component";
import { GroupLitOpenComponent } from
"./groups/group-detail/group-lits/group-lit-open/group-lit-open.component";
import { JoinAGroupComponent } from "./groups/join-a-group/join-a-group.component";


import { HomeComponent } from "@app/home/home.component";
import { MyLibraryComponent } from "@app/my-library/my-library.component";
import { LitOpenComponent } from "@app/my-library/lit-open/lit-open.component";

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  { path: 'groups/:groupId', component: GroupDetailComponent, canActivate: [AuthGuard]},
  { path: 'groups/join-a-group/:groupName/:groupId', component: JoinAGroupComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'groups/:groupId/:litId', component: GroupLitOpenComponent, canActivate: [AuthGuard]},
  { path: 'my-library', component: MyLibraryComponent, canActivate: [AuthGuard]},
  { path: 'my-library/:litId', component: LitOpenComponent, canActivate:[AuthGuard]}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
