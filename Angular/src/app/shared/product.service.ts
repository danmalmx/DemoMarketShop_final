import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly rootUrl = 'https://localhost:44318/api';
  list: Product[];

  constructor(private http: HttpClient) { }

  getProducts() {
    this.http.get(this.rootUrl+'/Products')
    .toPromise()
    .then(res => this.list = res as Product[])
  }
}
