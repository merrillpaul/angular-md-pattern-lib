import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';
import { UserDetails } from '../dto';

/**
 * a dummy security service
 */
@Injectable()
export class SecurityService {

    private _currentUser: Subject<UserDetails>;

    constructor() { 
       this._currentUser = new Subject<UserDetails>();       
    }   

    public get currentUser() : Observable<UserDetails> {
        return this._currentUser.asObservable().share();
    } 

    public markLogin(username: string) {
        let user = new UserDetails();
        user.username = username;
        user.firstName = username.toUpperCase();
        user.lastName = 'Doe'
        user.email = `${username}@psn.com`;
        user.loggedIn = true;
        this._currentUser.next(user);
    } 

    public markLogout() {
         this._currentUser.next(null);
    }

    
}