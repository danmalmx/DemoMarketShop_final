import { Product } from './../shared/product.model';
import { ShoppingCartService } from './../shared/shopping-cart.service';
import { ShoppingCart } from './../shared/shopping-cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

}


