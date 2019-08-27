import { ProductService } from './../shared/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/product.model';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { ShoppingCart, ResponseShoppingCart } from '../shared/shopping-cart.model';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  list: ShoppingCart[];

  constructor(private shoppingCartService: ShoppingCartService, private prodService: ProductService) { }

  ngOnInit() { }

  getAll() {
    this.shoppingCartService.getAll().subscribe(res => this.list = res);
    console.log('I getAll');
  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
}
