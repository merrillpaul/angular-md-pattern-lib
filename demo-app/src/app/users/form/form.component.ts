import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MediaQueryService } from '@pearson/angular-material';

import { UsersService, IUser } from '../../../services';

@Component({
  selector: 'user-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  viewProviders: [ UsersService ],
})
export class UsersFormComponent implements OnInit, AfterViewInit {

  displayName: string;
  email: string;
  id: string;
  admin: boolean;
  user: IUser;
  action: string;

  constructor(private _usersService: UsersService,
              private _route: ActivatedRoute,
              public media: MediaQueryService) {}

  goBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      let userId: string = params.id;      
        this.displayName = 'user.displayName';
        this.email = 'user.email';
        this.admin = true;
        this.id = userId;
      
    });
  }

  save(): void {
    let siteAdmin: number = (this.admin ? 1 : 0);
    let now: Date = new Date();
    this.user = {
      displayName: this.displayName,
      email: this.email,
      siteAdmin: siteAdmin,
      id: this.id || this.displayName.replace(/\s+/g, '.'),
      created: now,
      lastAccess: now,
    };
    if (this.action === 'add') {
      
    } else {
      
    }
  }
}
