import { Component, OnInit } from '@angular/core';
import { OrdersServices } from 'src/app/shared/orders.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Orders } from 'src/app/shared/orders.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private service: OrdersServices, private toastr: ToastrService, ) { }
  hide: boolean;
  form: NgForm;

  ngOnInit() {
    this.service.refreshList();
    this.resetForm();
    this.hide = false;
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
      this.updateRecord(form);
      this.service.refreshList();
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure you want to update the order?')) {
      this.service.editOrders(form.value).subscribe(
        res => {
          this.toastr.info('Order updated', 'Successful order update');
          this.resetForm(form);
          this.hide = false;
          this.service.refreshList();
        })
    }
  }
  populateForm(ord: Orders) {
    this.service.formData = Object.assign({}, ord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteOrder(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.info('Order deleted', 'Successfull deletion');
      });
    }
  }
}
