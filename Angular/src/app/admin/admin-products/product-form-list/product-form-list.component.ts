import { Product } from './../../../shared/product.model';
import { ProductService } from './../../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';
import { CategoryService } from '../../../shared/category.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form-list',
  templateUrl: './product-form-list.component.html',
  styleUrls: ['./product-form-list.component.css']
})
export class ProductFormListComponent implements OnInit {
  constructor(public productService: ProductService, private toaster: ToastrService) { }

  ngOnInit() {
    this.productService.refreshList();
  }

  populateForm(p: Product) {
    this.productService.product = Object.assign({}, p);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.productService.delete(id)
        .subscribe(res => {
          this.productService.refreshList();
          this.toaster.warning('Product deleted', '');
        },
          err => {
            console.log(err);
          });
    }
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure you want to update the order?')) {
      this.productService.uppdate(form.value).subscribe(
        res => {
          this.toaster.info('Product updated', '');
          this.resetForm(form);
          this.productService.refreshList();
        })
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.productService.product = {
      ProductId: null,
      ProductName: '',
      ProductDescription: '',
      ProductImage: '',
      ProductPrice: null,
      ProductQuantity: null,
      CategoryId: null,
      OrderId: null
    };
  }

}