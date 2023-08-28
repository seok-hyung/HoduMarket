export type Product = {
  count: number;
  next: string;
  previous: string;
  results: ProductResults;
};
export type ProductResults = {
  created_at: string;
  image: string;
  price: number;
  product_id: number;
  products_info: string;
  product_name: string;
  seller: number;
  shipping_fee: number;
  shipping_method: string; //PARCEL or DELIVERY
  stock: number;
  store_name: string;
  updated_at: string;
};
export type ProductsProps = {
  products: ProductResults[];
};
export type CarouselProps = {
  images: string[];
};

export type Tab = {
  title: string;
  content: JSX.Element;
};

export type UserForm = {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
};

export type SelectedType = {
  selected: boolean;
};
