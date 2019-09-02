import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {
      this.categories$ = categoryService.getAll();

      productService.getAll().subscribe(products => { this.products = products 

      

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        console.log("Category: " + this.category);

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.CategoryId.toString() === this.category) :
          this.products;
          });
      });
    }

    filter(query: string) {
      this.filteredProducts = (query) ?
      this.products.filter(p => p.ProductName.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    }

  ngOnInit() {
  }
}
