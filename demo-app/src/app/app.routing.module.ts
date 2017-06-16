import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
const routes: Routes =
[
  //{ path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
//  { path: 'product', loadChildren: 'app/dashboard-product/dashboard-product.module#DashboardProductModule'},
  { path: 'logs', loadChildren: 'app/logs/logs.module#LogsModule'},  
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule'},
  { path: 'kitchensink', loadChildren: 'app/kitchensink/kitchensink.module#KitchensinkModule'},
  // default
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), CoreModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }