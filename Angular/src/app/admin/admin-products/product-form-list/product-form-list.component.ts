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
  onDelete(ProductId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.productService.delete(ProductId)
        .subscribe(res => {
          this.productService.refreshList();
          this.toaster.warning('Deleted successfuly', 'Product Register');
        },
          err => {
            console.log(err);
          });
    }
  }

}
