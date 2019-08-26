import { Component, OnInit } from '@angular/core';
import { OrdersServices } from 'src/app/shared/orders.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Orders } from 'src/app/shared/orders.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private service: OrdersServices, private toastr: ToastrService, ) { }

  ngOnInit() {
    this.service.refreshList();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.service.formData = {
      OrderId: null,
      OrderShipName: '',
      OrderStreetAddress: '',
      OrderCity: '',
      OrderCountry: '',
      OrderTrackingNumber: '',
      CustomerId: null,
    }
  }

  onSubmit(form: NgForm) {
    if (confirm('Do you wan to update the order?')) {
      if (form.value.OrderId == null) {
        this.insertRecord(form);
      } else {
        this.insertRecord(form);
        this.service.refreshList();
      }
    }
  }

  insertRecord(form: NgForm) {
    this.service.editOrders(form.value).subscribe(
      res => {
        this.toastr.success('Order updated', 'Successful submission');
        this.resetForm(form);
        this.service.refreshList();
      })
  }
  populateForm(ord: Orders) {
    this.service.formData = Object.assign({}, ord);
  }

  onDelete(id: number){
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteOrder(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.info('Order deleted', 'Successfull deletion');
      });
    }
  }

}
