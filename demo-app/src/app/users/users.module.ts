import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { UsersFormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserComponent, UsersFormComponent, UsersComponent]
})
export class UsersModule { }
