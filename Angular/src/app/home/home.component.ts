import { Component, OnInit } from '@angular/core';
import { ProductService } from './../shared/product.service';
import { CategoryService } from '../shared/category.service';
import { Product } from './../shared/product.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  category: string;
  filteredProducts: Product[];

  constructor(
    route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) {
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        //this.filteredProducts = (this.category) ?  // Video 314 @ 6:12
      });
    }

  ngOnInit() {
    this.productService.getProducts();
    this.categoryService.getCategories();
  }


}
