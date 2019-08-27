import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingCart, ResponseShoppingCart } from './shopping-cart.model';
import { Observable } from 'rxjs';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  readonly rootUrl = 'https://localhost:44318/api';
  objTest = new ShoppingCart();
  obj = new ShoppingCart();
  objProd = new Product();
  returnData: ShoppingCart;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart');
  }

  private create(obj: ShoppingCart): Observable<ShoppingCart> {
    // console.log('I Servicen!!');
    // console.log(obj);
    return this.http.post<ShoppingCart>(this.rootUrl + '/ShoppingCart', obj);
  }

  private getCart(cartId: string) {
    return this.http.get(this.rootUrl + '/ShoppingCart' + cartId);
  }

  private getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.obj.DateCreated = new Date();
      this.obj.ProductName = 'Nytt Entry I DB';
      this.create(this.obj).subscribe((res: ResponseShoppingCart) => {
        this.returnData = res;
        localStorage.setItem('cartId', this.returnData.Id.toString());
        return this.returnData.Id.toString();
      });
    } else {                      /// Video 324 :: 3 min
        return cartId;
    }}

    addToCart(product: Product) {
      let cart = this.getOrCreateCartId();
  }

}
