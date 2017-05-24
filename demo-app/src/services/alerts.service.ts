import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';


@Injectable()
export class AlertsService {

  constructor(private _http: Http) { }

  query(): any {
    return this._http.get('data/alerts.json')
      .map((res: Response) => {
        return res.json();
      });
  }

  get(id: string): any {
    return this._http.get('data/alerts.json')
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

  getAssessments(): any {
    return this._http.get('data/assessment_status.json')
      .map((res: Response) => {
        return res.json();
      });
  }
}
