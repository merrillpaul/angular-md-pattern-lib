import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { SpinnerService } from '@pearson/angular-material';

import { SecurityService } from 'app/core/services';

@Component({
  selector: 'p1-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {

  username: string;
  password: string;

  constructor(private _router: Router,
              private _spinnerService: SpinnerService,
              private _titleService: Title,
              private security: SecurityService) {}

  login(): void {
    this._spinnerService.register();
    alert('Mock log in as ' + this.username);
    setTimeout(() => {
      this.security.markLogin(this.username);
      this._router.navigate(['/kitchensink']).then( () => {
        this._spinnerService.resolve();
      });         
    }, 2000);
  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'Pattern Lib Login' );
  }
}
