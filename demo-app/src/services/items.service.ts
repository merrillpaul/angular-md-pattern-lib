import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';


@Injectable()
export class ItemsService {

  constructor(private _http: Http) {

  }

  staticQuery(): any {
    return this._http.get('data/items.json')
      .map((res: Response) => {
        return res.json();
      });
  }

  staticGet(id: string): any {
    return this._http.get('data/items.json')
      .map((res: Response) => {
        let item: any;
        res.json().forEach((s: any) => {
          if (s.item_id === id) {
            item = s;
          }
        });
        return item;
      });
  }
}
