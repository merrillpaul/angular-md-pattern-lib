import { Component, AfterViewInit } from '@angular/core';
import { MediaQueryService, SpinnerService } from '@pearson/angular-material';

import { KitchensinkService } from 'services';

@Component({
  selector: 'kitchen-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  viewProviders: [KitchensinkService]
})
export class OverviewComponent implements AfterViewInit {

  items: Object[] = [];

  constructor(private media: MediaQueryService,
    private _spinnerService: SpinnerService,
    private _kitchenService: KitchensinkService) { }


  ngAfterViewInit(): void {
    this._spinnerService.register('kitchen.overview.load');
    this._kitchenService.getMenu().subscribe((menuItems: any[]) => {
      this.items = menuItems.filter((it) => !it.skip);
      setTimeout(() => {
        this._spinnerService.resolve('kitchen.overview.load');
      }, 2000);
    });

  }

}
