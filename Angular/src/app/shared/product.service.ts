import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly rootUrl = 'https://localhost:44318/api';
  list: Product[];
  product: Product = <Product> {};
  constructor(private http: HttpClient) { }

   getAll(): Observable<Product[]> {
 return this.http.get<Product[]>(this.rootUrl + '/Products');
 }

 create(Product): Observable<Product> {
   return this.http.post<Product>(this.rootUrl + '/Products', Product);
}

 uppdate(): Observable<Product> {
   return this.http.put<Product>(this.rootUrl + '/Products' + this.product.ProductId, this.product);
}
 delete(id): Observable<Product> {
   return this.http.delete<Product>(this.rootUrl + '/Products' + id);
}
refreshList() {
  this.http.get<Product[]>(this.rootUrl + '/Products').toPromise().then(res => this.list = res as Product[] );

}
}



