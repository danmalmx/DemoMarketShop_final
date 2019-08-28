export class ShoppingCart {
  Id: number;
  ShoppingCartId: number;
  DateCreated: Date;
  ProductId: number;
  Quantity: number;
}

export interface ResponseShoppingCart {
  Id: number;
  ShoppingCartId: number;
  DateCreated: Date;
  ProductId: number;
  Quantity: number;
}
