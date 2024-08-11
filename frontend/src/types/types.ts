export type CategoryType = {
  _id: string;
  name: string;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  shippingAddress?: {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
  };
  billingAddress?: {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
  };
};

export type ProductType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  picture: string;
  shortDescription: string;
  description: string;
  numAvailable: number;
};

export type CartItemType = {
  productId: string;
  product: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  _id?: string;
  user: string;
  date: string;
  products: CartItemType[];
  sumTotal: number;
  deliveryFee: number;
  status: string;
};

export type NotificationType = {
  _id?: string;
  userId: string;
  orderId: String;
  message: string;
  date: Date;
  status: String;
};
