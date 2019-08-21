import { Component, OnInit } from '@angular/core';
import { ProductService } from './../shared/product.service';
import { CategoryService } from '../shared/category.service';
import { Product } from './../shared/product.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {
      productService.getAll().subscribe(products => this.products = products);

      this.categories$ = categoryService.getAll();

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        // this.filteredProducts = (this.category) ?
        //   this.products.filter(p => { p.category === this.category }) :
        //   this.products;

        //this.category$ = params.get('category');    // Titta på senare: Mange
        //this.filteredProducts = (this.category) ?  // Video 314 @ 6:12
      });
    }

  ngOnInit() {
  }
}
