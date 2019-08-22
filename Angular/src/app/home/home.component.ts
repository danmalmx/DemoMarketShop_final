import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../shared/product.service';
import { CategoryService } from '../shared/category.service';
import { Product } from './../shared/product.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[]; //Product[];
  categories$;
  category: string;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {
      productService.getAll()
        .subscribe(products => this.filteredProducts = this.products = products);

      this.categories$ = categoryService.getAll();

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        // let svar = parseInt(this.category, 10);

        // this.filteredProducts = (this.category) ?
        //   this.products.filter(p => p.ProductId === svar) :
        //   this.products;

        //this.category$ = params.get('category');    // Titta på filter med filter senare: Mange
        //this.filteredProducts = (this.category) ?  // Video 314 @ 6:12
      });
    }

    filter(query: string) {
      this.filteredProducts = (query) ?
      this.products.filter(p => p.ProductName.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

  ngOnInit() {
  }
}
