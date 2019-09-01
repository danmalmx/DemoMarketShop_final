import { Product } from './../shared/product.model';
import { ProductService } from './../shared/product.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { ShoppingCart, ResponseShoppingCart } from '../shared/shopping-cart.model';
import { HttpBackend } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { prependOnceListener } from 'cluster';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') ShoppingCart;
  list: ShoppingCart[];
  shopList: ShoppingCart[];
  shopList2: ShoppingCart[];
  obj = new ShoppingCart();
  returnObj: ShoppingCart;
  newShopObj = new ShoppingCart();
  isInShop = false;
  quantityShop: number;
  tempObj = new Product();
  tempNumber: number;
  tempVar: ShoppingCart[];

  constructor(private shoppingCartService: ShoppingCartService, private prodService: ProductService) { }

  async ngOnInit() { // Lite för snabb för nästa method när listan används :: ATT FIXA!!
    (await this.shoppingCartService.returnAllProdInShoppingCart())
      .subscribe(res => this.shopList2 = res);
  }

  showOnInit(product: Product) {
    let cartId = this.shoppingCartService.getOrCreateCartId();
    let tempCartId: number;
    this.shopList2.forEach(element => {
      if (cartId === element.ShoppingCartId && product.ProductId === element.ProductId) {
        tempCartId = element.Quantity;
      }
    });
    if (tempCartId > 0) {
    return tempCartId;
    }
    return 0;
  }

  async addToCart(product: Product, change: number) {
    let returnValue = 0;
    let cartId = this.shoppingCartService.getOrCreateCartId();
    let inProduct = product.ProductId;
    let inProdName = product.ProductName;
    let inProdPrice = product.ProductPrice;
    await this.shoppingCartService.returnAllProdInShoppingCart()
    .toPromise()
    .then(res => this.shopList = res);

    console.log('Jag har Cart: ' + cartId);
    console.log('Klickat på ProduktId: ' + inProduct);

    this.shopList.forEach(element => {
      if (element.ShoppingCartId === cartId && element.ProductId === inProduct) {
        element.Quantity += change;
        returnValue = element.Quantity;
        this.quantityShop = returnValue;
        this.shoppingCartService.updateQuantityWithOne(element.Id, element).subscribe((res: any) => this.obj = res);
        this.isInShop = true;
        }});

    if (!this.isInShop) {
      this.newShopObj.ShoppingCartId = cartId;
      this.newShopObj.ProductId = inProduct;
      this.newShopObj.ProductName = inProdName;
      this.newShopObj.ProductPrice = inProdPrice;
      this.newShopObj.Quantity = change;
      this.quantityShop = change;
      this.shoppingCartService.create(this.newShopObj).subscribe(res => this.obj = res);
    }
    // console.log("ReturnValue: " + returnValue);
    return returnValue;
  }
}
