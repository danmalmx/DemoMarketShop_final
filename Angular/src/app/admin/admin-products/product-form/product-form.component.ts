import { Category } from '../../../shared/category.model';
import { Product } from '../../../shared/product.model';
import { ProductService } from '../../../shared/product.service';
import { CategoryService } from '../../../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: []
})
export class ProductFormComponent implements OnInit {
  Categories$  ;
  product = new Product();
  category: Category ;
  constructor(public categoryService: CategoryService, public productService: ProductService, private toaster: ToastrService) {
    this.Categories$ = categoryService.getAll();
  }

  save(f: Product, form: NgForm) {
   f.OrderId = 1;
   if (this.productService.product.ProductId == 0) {
      this.insertRecord(f, form);
    }
    // tslint:disable-next-line: one-line
    else {
      this.uppdateRecord(form);
    }
  }
  insertRecord(f: Product, form: NgForm) {
    this.productService.create(f).subscribe(
      res => {
      this.resetForm(form);
      this.toaster.success('Submitted successfully', 'Product Register');
      this.productService.refreshList();
     },
     err => {
       console.log(err);
     }
   );
  }
  uppdateRecord(form: NgForm) {
    this.productService.uppdate().subscribe(
      res => {
      this.resetForm(form);
      this.toaster.info('Submitted successfully', 'Product Register');
      this.productService.refreshList();
     },
     err => {
       console.log(err);
     }
   );
  }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {

    this.productService.product = {
      ProductId : 0 ,
      ProductName : '' ,
      ProductPrice : 0 ,
      ProductImage : '',
      ProductQuantity : 0,
      CategoryId : 0,
      OrderId : 0,
      ProductDescription : ''

  };
}
}

