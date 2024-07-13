export type CategoryType = {
  _id: string;
  name: string;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
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
