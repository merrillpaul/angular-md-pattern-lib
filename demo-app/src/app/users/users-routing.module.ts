import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { UsersFormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: 'list', component: UserComponent, children: [
      { path: '', component: UsersComponent },
      { path: 'add', component: UsersFormComponent },
      { path: ':id/delete', component: UsersFormComponent },
      { path: ':id/edit', component: UsersFormComponent }
    ]
    
  },
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
