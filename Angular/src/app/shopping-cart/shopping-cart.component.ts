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
  cartNrItems: number;
  totalPrice: number = 0;
  shopItemList: ShoppingCart[];
  shopItemListTotPrice: ShoppingCart[];
  shopList: ShoppingCart[];
  shopListUpdated: ShoppingCart[];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.addNumberOfItemsInShop();
    this.getAllMyItemsInShop();
    this.setPricePerQuantity();
  }

  setPricePerQuantity() {
    // this.shopListUpdated = this.shopList;
    // this.shopList.forEach(element => {
    //   if ( element.Quantity !== 0 ) {
    //     element.ProductPrice = element.Quantity * element.ProductPrice;
    //   }
    // });
  }

  getAllMyItemsInShop() {
    this.shoppingCartService.getAll().subscribe(res => this.shopList = res);
    // this.shopListUpdated = this.shopList;

    console.log("Jag är i rätt metod!!");
  }

  addNumberOfItemsInShop() {
    this.shoppingCartService.returnNumberOfItemsInCart();
  }

}


