import { Component, Input, forwardRef, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavLayoutComponent } from '../nav.component';

@Component({
  selector: 'nav-body',
  styleUrls: ['./nav-body.component.scss' ],
  templateUrl: './nav-body.component.html',
})
export class NavBodyComponent {
    constructor(@Optional() @Inject(forwardRef(() => NavLayoutComponent)) private _layout: NavLayoutComponent,
              @Optional() private _router: Router) {}
}
