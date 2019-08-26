import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly rootUrl = 'https://localhost:44318/api';
  // readonly rootUrl = 'https://localhost:5001/api';



  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.rootUrl + '/Categories');
  }
}
