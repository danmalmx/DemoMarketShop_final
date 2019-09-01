import { element } from 'protractor';
import { Product } from './product.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingCart, ResponseShoppingCart } from './shopping-cart.model';
import { Observable } from 'rxjs';
import { strictEqual } from 'assert';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ConcatSource } from 'webpack-sources';

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
  cartList: ShoppingCart[];
  numberOfItemInShop: number = 0;

  constructor(private http: HttpClient) { }

  async clearCart(userId) {
    console.log("UserID: " + userId);
    await this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart')
    .toPromise()
    .then(res => this.cartList = res);
    this.cartList.forEach(element => {
      if (userId === element.ShoppingCartId) {
        this.deleteItemInCart(element.Id).subscribe(res => this.obj = res);
      }
    });
    return true;
  }

  async returnNumberOfItemsInCart() {
    const cartId = localStorage.getItem('cartId');
    let cartIdNumber = parseInt(cartId);
    await this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart') // .subscribe(res => this.cartList = res);
    .toPromise()
    .then(res => this.cartList = res);
    this.numberOfItemInShop = 0;
    this.cartList.forEach(element => {
      if (cartIdNumber === element.ShoppingCartId) {
        this.numberOfItemInShop += element.Quantity;
      }
    });
    return this.numberOfItemInShop;
  }

  getAll(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart');
  }

  create(obj: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(this.rootUrl + '/ShoppingCart', obj);
  }

  getCartId(cartId: string) {
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

  deleteItemInCart(Id: number): Observable<ShoppingCart> {
    return this.http.delete<ShoppingCart>(this.rootUrl + '/ShoppingCart/' + Id);
  }

  updateQuantityWithOne(elemenId: number, prod: ShoppingCart) {
    return this.http.put(this.rootUrl + '/ShoppingCart/' + elemenId, prod);
  }

  returnAllProdInShoppingCart(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart');
  }
}
