import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SpinnerService, DialogService, MediaQueryService } from '@pearson/angular-material';


@Component({
  selector: 'user',
  templateUrl: './user.component.html'   
})
export class UserComponent  {

  constructor(public media: MediaQueryService) {}
}
