import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';


import { KitchensinkRoutingModule } from './kitchensink-routing.module';
import { KitchensinkComponent } from './kitchensink.component';
import {
  OverviewComponent, 
  LibraryComponent, 
  DialogExampleComponent, 
  ExpandingPanelExampleComponent, 
  FileExampleComponent,
  LoadingExampleComponent, 
  PagingBarExampleComponent,
  NotificationsExampleComponent,
  ChartsExampleComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    KitchensinkRoutingModule
  ],
  declarations: [
    KitchensinkComponent,
    OverviewComponent, 
    LibraryComponent, 
    DialogExampleComponent,
    ExpandingPanelExampleComponent,
    FileExampleComponent,
    LoadingExampleComponent,
    PagingBarExampleComponent,
    NotificationsExampleComponent,
    ChartsExampleComponent
  ]
})
export class KitchensinkModule { }
