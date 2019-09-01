import { Orders } from 'src/app/shared/orders.model';
import { OrdersServices } from 'src/app/shared/orders.service';
import { Product } from './../shared/product.model';
import { ShoppingCart } from './../shared/shopping-cart.model';
import { ShoppingCartService } from './../shared/shopping-cart.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  order: Orders;
  cartList: ShoppingCart[];
  subscription: Subscription;
  shipping: any;
  shopListUpdated: ShoppingCart[];
  tempShopObj: ShoppingCart;
  cartNrItems: number = 0;
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService,
    ordersServices: OrdersServices) { }

  async ngOnInit() {
    this.setPricePerQuantity();
    this.subscription = await this.shoppingCartService.returnAllProdInShoppingCart().subscribe(res => this.cartList = res);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async setPricePerQuantity() {
    await this.shoppingCartService.getAll()
    .toPromise()
    .then(res => this.shopListUpdated = res);

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

  placeOrder() {

  }

  clearCart() {
    const cartId = parseInt(localStorage.getItem('cartId'), 10);
    this.shoppingCartService.clearCart(cartId);
    this.totalPrice = 0;
    this.ngOnInit();
  }

  save(f: Product, form: NgForm) { }

}
