export type CartItemType = {
  productId: string;
  product: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  _id?: string;
  user: string;
  date: Date;
  products: CartItemType[];
  sumTotal: number;
  deliveryFee: number;
  status: string;
};
