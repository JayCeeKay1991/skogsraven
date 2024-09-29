export type NotificationType = {
  userId: string;
  orderId: string;
  message: string;
  date: Date;
  status: string;
};

export type ProductMessageType = {
  productId: string;
  quantity: number;
};
