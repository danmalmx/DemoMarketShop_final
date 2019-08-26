import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly rootUrl = 'https://localhost:44318/api';
  // readonly rootUrl = 'https://localhost:5001/api';


  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.rootUrl + '/Products');
  }
}
