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

    cart$.subscribe(cart => {
      console.log("TjooHoo!");
    })
  }

  // this.shopList.forEach(element => {
  //   if (cartId === element.ShoppingCartId) {
  //     this.shoppingCartItemCount += element.Quantity;
  //     console.log("----------------------------------------");
  //     console.log("Från Navbar, cartId: " + cartId);
  //     console.log("Från Navbar, ShoppingCartId: " + element.ShoppingCartId);
  //     console.log("Från Navbar, Quantity: " + element.Quantity);
  //     console.log("Från Navbar, shoppingCartItemCount: " + this.shoppingCartItemCount);
  //     console.log("----------------------------------------");
  //   }
  // });



  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }


}
