export class ShoppingCart {
  Id: number;
  ShoppingCartId: number;
  DateCreated: Date;
  ProductName: string;
  Quantity: number;
}

export interface ResponseShoppingCart {
  Id: number;
  ShoppingCartId: number;
  DateCreated: Date;
  ProductName: string;
  Quantity: number;
}
