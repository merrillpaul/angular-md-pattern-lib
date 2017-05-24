import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


export interface IUser {
  displayName: string;
  id: string;
  email: string;
  created: Date;
  lastAccess: Date;
  siteAdmin: number;
}

@Injectable()
export class UsersService  {

  constructor(private _http: Http) {
   
  }

  staticQuery(): Observable<IUser[]> {
    return this._http.get('data/users.json')
    .map((res: Response) => {
      return res.json();
    });
  }
}
