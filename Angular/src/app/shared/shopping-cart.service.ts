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
  returnData: ShoppingCart;
  shopList: ShoppingCart[];
  returnShopObj: any;
  shopObj: ShoppingCart[];

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
      // this.obj.DateCreated = new Date();
      // this.obj.ProductName = 'Nytt Entry I DB';
      this.create(this.obj).subscribe((res: ResponseShoppingCart) => {
        this.returnData = res;
        localStorage.setItem('cartId', this.returnData.Id.toString());
        return this.returnData.Id;
      });
    } else {                      /// Video 324 :: 3 min
        return parseInt(cartId, 10);
    }}

    async addToCart(product: Product) {
      let cartId = this.getOrCreateCartId();
      let inProduct = product.ProductId;
      let inlistId: boolean = false;
      await this.returnAllProdInShoppingCart().subscribe(res => this.shopList = res);
      // .toPromise()
      // .then((res: any[]) => this.shopObj = res);

      console.log('Cart: ' + cartId);
      console.log('ProduktId: ' + inProduct);

      this.shopList.forEach(async element => {
        console.log('-------------------------');
        console.log("Id: " + element.Id);
        console.log("ShoppingCartId: " + element.ShoppingCartId);
        console.log("ProductId: " + element.ProductId);
        console.log("Quantity: " + element.Quantity);
        console.log('-------------------------');

        if (element.ShoppingCartId === cartId && element.ProductId === inProduct) {
          element.Quantity += 1;
          // this.http.put(this.rootUrl + '/ShoppingCart/' + element.Id, element);
          await this.updateQuantityWithOne(element.Id, element) // .subscribe((res: any) => this.obj = res);
          .toPromise()
          .then((res: any) => this.obj = res);
          console.log('Jag lägger till 1 på Quantity!!');
        }
        this.returnAllProdInShoppingCart().subscribe(res => this.shopList = res);
        // .toPromise()
        // .then((res: ShoppingCart[]) => this.shopObj = res);
      });


  }

  updateQuantityWithOne(elemenId: number, prod: ShoppingCart) {
    return this.http.put(this.rootUrl + '/ShoppingCart/' + elemenId, prod);
  }

  // returnAllProdInShoppingCart() {
  //   return this.http.get(this.rootUrl + '/ShoppingCart');
  // }

  returnAllProdInShoppingCart(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart');
  }

  postAProdInShoppingCart(shopObj: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(this.rootUrl + '/ShoppingCart', shopObj);
  }

}
