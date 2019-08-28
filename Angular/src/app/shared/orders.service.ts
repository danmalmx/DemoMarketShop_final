import { Injectable } from '@angular/core';
import { Orders } from './orders.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrdersServices {
  formData: Orders;
  list: Orders[];
  // readonly rootUrl = 'https://localhost:44318/api';
  readonly rootUrl = 'https://localhost:5001/api';


  constructor(private http: HttpClient) { }

  postOrders(formData: Orders) {
    console.log("Hello", formData)
    return this.http.post(this.rootUrl + '/Orders', formData);
  }

  editOrders(formData: Orders) {
    return this.http.put(this.rootUrl + '/Orders/' + formData.OrderId, formData);
  }

  refreshList() {
    this.http.get(this.rootUrl + '/Orders')
      .toPromise().then(res => { this.list = res as Orders[]; });
  }

  deleteOrder(id: number) {
    return this.http.delete(this.rootUrl + '/Orders/' + id);
  }

}
