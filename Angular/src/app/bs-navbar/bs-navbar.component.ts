import { element } from 'protractor';
import { ShoppingCartService } from './../shared/shopping-cart.service';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from '../shared/shopping-cart.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  shopList: ShoppingCart[];
  shoppingCartItemCount: number = 0;

  constructor(private router: Router, private service: UserService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cartId = this.shoppingCartService.getOrCreateCartId();
    let cart$ = await this.shoppingCartService.returnAllProdInShoppingCart();

    cart$.subscribe(res => this.shopList = res); // Fixa ut antal items i shoppen
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }


}
