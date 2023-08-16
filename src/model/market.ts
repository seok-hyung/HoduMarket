export type Product = ProductResults & {
  count: number;
  next: string;
  previous: string;
  results: ProductResults;
};
export type ProductResults = {
  product_id: number;
  product_name: string;
  seller: number;
  seller_store: string;
  image: string;
  price: number;
  shipping_method: string; //PARCEL or DELIVERY
  shipping_fee: number;
  stock: number;
  products_info: string;
};
export type CarouselProps = {
  images: string[];
};
