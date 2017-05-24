import { Component } from '@angular/core';

import { single, multi } from './data';


@Component({
    selector: 'charts-example',
    templateUrl: './charts.component.html'
})
export class ChartsExampleComponent {
    // Chart
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Products';

  colorScheme: any = {
    domain: [
        /*'#00132c',*/ '#003057', 
       /* '#004f77', '#007fa3',*/ '#2692b1', 
       /* '#e46300',*/ '#ea7600',
        '#ffa011', '#ffb81c' 
        ]
  };

  // line, area
  autoScale: boolean = true;

  constructor( ) {
    // Chart Single
    Object.assign(this, {single});
    // Chart Multi
    this.multi = multi.map((group: any) => {
      group.series = group.series.map((dataItem: any) => {
        dataItem.name = new Date(dataItem.name);
        return dataItem;
      });
      return group;
    });
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return val;
  }
}