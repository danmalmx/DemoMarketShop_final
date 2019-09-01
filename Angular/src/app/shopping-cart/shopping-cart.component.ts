import { ProductService } from './../shared/product.service';
import { Product } from './../shared/product.model';
import { ShoppingCartService } from './../shared/shopping-cart.service';
import { ShoppingCart } from './../shared/shopping-cart.model';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Product[];
  cartNrItems: number;
  totalPrice: number = 0;
  shopItemList: ShoppingCart[];
  shopItemListTotPrice: ShoppingCart[];
  shopList: ShoppingCart[];
  shopListUpdated: ShoppingCart[];
  tempShopObj: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService) {
    productService.getAll().subscribe(products => this.products = products);
  }

  ngOnInit() {
    this.deleteItem();
    this.addNumberOfItemsInShop();
    this.getAllMyItemsInShop();
    this.setPricePerQuantity();
  }



  clearCart() {
    const cartId = parseInt(localStorage.getItem('cartId'), 10);
    this.shoppingCartService.clearCart(cartId);
    this.totalPrice = 0;
    this.ngOnInit();
  }

  async deleteItem() {
    await this.shoppingCartService.getAll()
    .toPromise()
    .then(res => this.shopListUpdated = res);
    this.shopListUpdated.forEach(element => {
      if ( element.Quantity === 0 ) {
        this.shoppingCartService.deleteItemInCart(element.Id).subscribe((res => this.tempShopObj = res));
        this.ngOnInit();
      }
    });
  }

  async setPricePerQuantity() {
    await this.shoppingCartService.getAll()
    .toPromise()
    .then(res => this.shopListUpdated = res);
    // this.shopListUpdated = this.shopList.map(obj => ({...obj}));
    this.shopListUpdated.forEach(element => {
      if ( element.Quantity === 0 ) {
        this.shoppingCartService.deleteItemInCart(element.Id).subscribe((res => this.tempShopObj = res));
      }
    });

    this.shopListUpdated.forEach(element => {
      if ( element.Quantity !== 0 ) {
        this.cartNrItems += element.Quantity;
      }
    });

    this.shopListUpdated.forEach(element => {
      if ( element.Quantity !== 0 ) {
        element.ProductPrice = element.Quantity * element.ProductPrice;
        this.totalPrice += element.ProductPrice;
      }
    });
  }

  getAllMyItemsInShop() {
    this.shoppingCartService.getAll().subscribe(res => this.shopList = res);
  }

  addNumberOfItemsInShop() {
    this.shoppingCartService.returnNumberOfItemsInCart();
  }

}


