import { Product } from './../shared/product.model';
import { ProductService } from './../shared/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { ShoppingCart, ResponseShoppingCart } from '../shared/shopping-cart.model';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit{
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


  constructor(private shoppingCartService: ShoppingCartService, private prodService: ProductService) { }

  ngOnInit() { }

  async showOnInit() {
    return 123;
  }

  async addToCart(product: Product) {
    let returnValue = 0;
    let cartId = this.shoppingCartService.getOrCreateCartId();
    let inProduct = product.ProductId;
    await this.shoppingCartService.returnAllProdInShoppingCart()
    .toPromise()
    .then(res => this.shopList = res);

    console.log('Jag har Cart: ' + cartId);
    console.log('Klickat på ProduktId: ' + inProduct);

    this.shopList.forEach(element => {
      if (element.ShoppingCartId === cartId && element.ProductId === inProduct) {
        element.Quantity += 1;
        returnValue = element.Quantity;
        this.quantityShop = returnValue;
        this.shoppingCartService.updateQuantityWithOne(element.Id, element).subscribe((res: any) => this.obj = res);
        this.isInShop = true;
        }});

    if (!this.isInShop) {
      this.newShopObj.ShoppingCartId = cartId;
      this.newShopObj.ProductId = inProduct;
      this.newShopObj.Quantity = 1;
      this.shoppingCartService.create(this.newShopObj).subscribe(res => this.obj = res);
    }
    // console.log("ReturnValue: " + returnValue);
    return returnValue;
  }
}
