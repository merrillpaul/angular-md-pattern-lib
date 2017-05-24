import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SpinnerService, MediaQueryService } from '@pearson/angular-material';

import { UsersService, ProductsService } from 'services';

@Component({
  selector: 'logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  viewProviders: [ UsersService, ProductsService]
})
export class LogsComponent implements AfterViewInit {

  items: Object[];
  users: Object[];
  products: Object[];
  _selectedProduct: Object;

  constructor(private _titleService: Title,
    private _usersService: UsersService,
    private _productsService: ProductsService,
    private _loadingService: SpinnerService,
    public media: MediaQueryService) {

  }

  ngAfterViewInit(): void {
   
    this._titleService.setTitle('Logs');


    this._loadingService.register('products.load');
    this._productsService.query().subscribe((products: Object[]) => {
      this.products = products;
      if (this.products.length > 0) {
        this._selectedProduct = this.products[0];
      }
      setTimeout(() => {
        this._loadingService.resolve('products.load');
      }, 2000);
    });
    this._loadingService.register('users.load');
    this._usersService.staticQuery().subscribe((users: Object[]) => {
      this.users = users;
      setTimeout(() => {
        this._loadingService.resolve('users.load');
      }, 2000);
    }, (error: Error) => {
      this._usersService.staticQuery().subscribe((users: Object[]) => {
        this.users = users;
        setTimeout(() => {
          this._loadingService.resolve('users.load');
        }, 2000);
      });
    });
  }

  public selectProduct(product: Object): void {
        this._selectedProduct = product;
  }

  public get selectedProduct(): Object {
    return this._selectedProduct;
  }

}
