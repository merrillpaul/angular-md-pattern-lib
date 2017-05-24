import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';


@Injectable()
export class KitchensinkService {

  constructor(private _http: Http) { }

  getMenu(): any {
    return this._http.get('data/kitchensink/menu.json')
      .map((res: Response) => {
        return res.json();
      });
  }
}