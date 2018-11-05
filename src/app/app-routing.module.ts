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

import { GroupLitThreadsListComponent } from
"@group-lit-threads-mgmt/group-lit-threads-list/group-lit-threads-list.component";
import { GroupLitSingleThreadComponent } from
"@group-lit-threads-mgmt/group-lit-single-thread/group-lit-single-thread.component";

import { GroupLitThreadCreateComponent} from
"@group-lit-threads-mgmt/group-lit-thread-create/group-lit-thread-create.component";

import { GroupLitThreadUpdateComponent } from
"@group-lit-threads-mgmt/group-lit-thread-update/group-lit-thread-update.component";

import { GroupLitThreadsSearchComponent } from
"@group-lit-threads-mgmt/group-lit-threads-search/group-lit-threads-search.component";

import { JoinAGroupComponent } from "./groups/join-a-group/join-a-group.component";
import { HomeComponent } from "@app/home/home.component";
import { MyLibraryComponent } from "@app/my-library/my-library.component";
import { LitOpenComponent } from "@app/my-library/lit-open/lit-open.component";

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
  { path: 'groups/:groupName/:groupId',
  component: GroupDetailComponent, canActivate: [AuthGuard]},

  { path: 'groups/join-a-group/:groupName/:groupId', component: JoinAGroupComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  { path: 'groups/:groupName/:groupId/:litId',
  component: GroupLitOpenComponent, canActivate: [AuthGuard],
  children:[
    {path: 'list', component: GroupLitThreadsListComponent},
    {path: 'view', component: GroupLitSingleThreadComponent},
    {path: 'create', component: GroupLitThreadCreateComponent},
    {path: 'update', component: GroupLitThreadUpdateComponent},
    {path: 'search', component: GroupLitThreadsSearchComponent} //resolve query str
  ]
  },
  { path: 'my-library', component: MyLibraryComponent, canActivate: [AuthGuard]},
  { path: 'my-library/:litId', component: LitOpenComponent, canActivate:[AuthGuard]}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
