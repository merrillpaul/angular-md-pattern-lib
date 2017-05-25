import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { SpinnerService, DialogService, MediaQueryService } from '@pearson/angular-material';

import { UsersService, IUser } from '../../services';

@Component({
  selector: 'user-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  viewProviders: [ UsersService ],
})
export class UsersComponent implements AfterViewInit {

  users: IUser[];
  filteredUsers: IUser[];

  constructor(private _titleService: Title,
              private _router: Router,
              private _loadingService: SpinnerService,
              private _dialogService: DialogService,
              private _snackBarService: MdSnackBar,
              private _usersService: UsersService,
              public media: MediaQueryService) {
  }

  goBack(route: string): void {
    this._router.navigate(['/']);
  }

  ngAfterViewInit(): void {
   

    this._titleService.setTitle( 'Users' );
    this.loadUsers();
  }

  filterUsers(displayName: string = ''): void {
    this.filteredUsers = this.users.filter((user: IUser) => {
      return user.displayName.toLowerCase().indexOf(displayName.toLowerCase()) > -1;
    });
  }

  loadUsers(): void {
    this._loadingService.register('users.list');
    this._usersService.staticQuery().subscribe((users: IUser[]) => {
      this.users = users;
      this.filteredUsers = users;
      this._loadingService.resolve('users.list');
    }, (error: Error) => {
      this._usersService.staticQuery().subscribe((users: IUser[]) => {
        this.users = users;
        this.filteredUsers = users;
        this._loadingService.resolve('users.list');
      });
    });
  }

  deleteUser(id: string): void {
     this._dialogService.warning({
      title: 'Hmm?',      
      message: 'Are you sure you want to delete this user?'
    }, {
        width: '50%'
    }).subscribe(res => {
        console.log('Response', res);
    });
    
  }

}
