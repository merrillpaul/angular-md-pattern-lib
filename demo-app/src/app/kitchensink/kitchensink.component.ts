
import { Component, AfterContentInit, ElementRef, Inject, Renderer2, ViewContainerRef } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';
import { MediaQueryService, SpinnerService, ToastService } from '@pearson/angular-material';

import { fadeAnimation } from 'app/app.animations';

import { KitchensinkService } from 'services';

@Component({
  selector: 'kitchensink',
  templateUrl: './kitchensink.component.html',
  styleUrls: ['./kitchensink.component.scss'],
  viewProviders: [KitchensinkService]
})
export class KitchensinkComponent implements AfterContentInit {


  items: Object[] = [];

  constructor(private media: MediaQueryService,
    private _titleService: Title,
    private vcr: ViewContainerRef,
    private toastService: ToastService,
    private _loadingService: SpinnerService,
    private _kitchenService: KitchensinkService) { 
      this.toastService.setup(this.vcr);
    }


  ngAfterContentInit(): void {
    this._titleService.setTitle('NG Material Kitchen Sink');
    this._loadingService.register('kitchen.side.load');
    this._kitchenService.getMenu().subscribe((menuItems: Object[]) => {
      this.items = menuItems;
      setTimeout(() => {
        this._loadingService.resolve('kitchen.side.load');
      }, 2000);
    });

  }


}
