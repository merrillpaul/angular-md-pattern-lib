import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { LogsDetailsComponent } from './logs.details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LogsRoutingModule
  ],
  declarations: [
    LogsComponent,
    LogsDetailsComponent
  ]
})
export class LogsModule { }
