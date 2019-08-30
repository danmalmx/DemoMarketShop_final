export class ShoppingCart {
  Id: number;
  ShoppingCartId: number;
  ProductName: string;
  ProductPrice: number;
  ProductId: number;
  Quantity: number;
}

export interface ResponseShoppingCart {
  Id: number;
  ShoppingCartId: number;
  ProductName: string;
  ProductPrice: number;
  ProductId: number;
  Quantity: number;
}
