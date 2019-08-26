import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/product.model';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { ShoppingCart } from '../shared/shopping-cart.model';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  obj = new ShoppingCart();
  list: ShoppingCart[];

  constructor(private CartService: ShoppingCartService) { }

  ngOnInit() { }

  getAll() {
    this.CartService.getAll().subscribe(res => this.list = res);
    console.log('I getAll');
  }

  addToCart(product: Product) {
    let cartId = localStorage.getItem('cartId');
    if(!cartId) {
      this.obj.DateCreated = new Date();
      this.obj.ProductName = 'Kalle Anka';
      this.CartService.create(this.obj);
      console.log('I componenten!!');
    }
  }
}
