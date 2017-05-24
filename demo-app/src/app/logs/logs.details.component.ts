import { Component, Input, AfterViewInit, OnInit } from '@angular/core';


import { SpinnerService, MediaQueryService } from '@pearson/angular-material';

import { ItemsService } from 'services';

@Component({
    selector: 'logs-details',
    templateUrl: './logs.details.component.html',
    viewProviders: [ItemsService]
})

export class LogsDetailsComponent implements OnInit {

    @Input()
    product: Object;

    items: Object[];

    constructor(private _itemsService: ItemsService,
        private media: MediaQueryService,
        private _loadingService: SpinnerService) { }


    ngOnInit(): void {
        

        this._loadingService.register('items.load');
        this._itemsService.staticQuery().subscribe((items: Object[]) => {
            this.items = items;
            setTimeout(() => {
                this._loadingService.resolve('items.load');
            }, 2000);
        }, (error: Error) => {
            this._itemsService.staticQuery().subscribe((items: Object[]) => {
                this.items = items;
                setTimeout(() => {
                    this._loadingService.resolve('items.load');
                }, 2000);
            });
        });        
    }
}