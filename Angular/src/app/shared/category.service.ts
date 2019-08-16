import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  list: Category[];
  readonly rootUrl = 'https://localhost:44318/api';

  constructor(private http: HttpClient) { }

  getCategories() {
    this.http.get(this.rootUrl + '/Categories')
    .toPromise()
    .then(res => this.list = res as Category[]);
  }
}
