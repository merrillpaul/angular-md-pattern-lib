import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    ChartsExampleComponent,
    DataGridsExampleComponent
} from './components';

const routes: Routes = [
  {
    path: 'home', component: KitchensinkComponent, children: [
      { path: '', component: OverviewComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'dialogs', component: DialogExampleComponent },
      { path: 'expansion-panel', component: ExpandingPanelExampleComponent },
      { path: 'files', component: FileExampleComponent },
      { path: 'loading', component: LoadingExampleComponent },
      { path: 'paging', component: PagingBarExampleComponent },
      { path: 'notifications', component: NotificationsExampleComponent },
      { path: 'charts', component: ChartsExampleComponent },
      { path: 'datagrids', component: DataGridsExampleComponent }
    ]    
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchensinkRoutingModule { }
