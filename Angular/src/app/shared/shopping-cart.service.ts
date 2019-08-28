import { element } from 'protractor';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingCart, ResponseShoppingCart } from './shopping-cart.model';
import { Observable } from 'rxjs';
import { strictEqual } from 'assert';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  readonly rootUrl = 'https://localhost:44318/api';
  objTest = new ShoppingCart();
  obj = new ShoppingCart();
  objProd = new Product();
  returData: ShoppingCart;
  shopList: ShoppingCart[];
  returnShopObj: any;
  shopObj: ShoppingCart[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart');
  }

  create(obj: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(this.rootUrl + '/ShoppingCart', obj);
  }

  getCart(cartId: string) {
    return this.http.get(this.rootUrl + '/ShoppingCart' + cartId);
  }

  getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.create(this.obj).subscribe((res: ResponseShoppingCart) => {
        this.returData = res;
        localStorage.setItem('cartId', this.returData.Id.toString());
        return this.returData.Id;
      });
    } else {
        return parseInt(cartId, 10);
    }}

  updateQuantityWithOne(elemenId: number, prod: ShoppingCart) {
    return this.http.put(this.rootUrl + '/ShoppingCart/' + elemenId, prod);
  }

  returnAllProdInShoppingCart(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart');
  }
}
