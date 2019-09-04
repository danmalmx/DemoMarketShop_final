import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly rootUrl = 'https://localhost:44318/api';
  // readonly rootUrl = 'https://localhost:5001/api';

  list: Product[];
  product: Product = <Product>{};
  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.rootUrl + '/Products');
  }

  create(formData: Product) {
    return this.http.post(this.rootUrl + '/Products', formData);
  }

  uppdate(formData: Product) {
    return this.http.put(this.rootUrl + '/Products/' + formData.ProductId, formData);
  }

  delete(id: number) {
    return this.http.delete(this.rootUrl + '/Products/' + id);

  }
  refreshList() {
    this.http.get<Product[]>(this.rootUrl + '/Products').toPromise().then(res => this.list = res as Product[]);

  }
}
