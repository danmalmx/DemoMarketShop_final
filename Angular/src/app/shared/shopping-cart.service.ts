import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingCart } from './shopping-cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  readonly rootUrl = 'https://localhost:44318/api';
  // obj = new ShoppingCart();

  constructor(private http: HttpClient) { }

  getAll(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.rootUrl + '/ShoppingCart');
  }

  create(obj: ShoppingCart): Observable<ShoppingCart> {
    // this.obj.DateCreated = new Date();
    // this.obj.ProductName = 'Kalle Anka';
    console.log('I Servicen!!');
    console.log(obj);
    return this.http.post<ShoppingCart>(this.rootUrl + '/ShoppingCart', obj);
  }

}
