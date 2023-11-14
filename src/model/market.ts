export type Product = {
  count: number;
  next: string;
  previous: string;
  results: ProductDetail;
};
export type ProductDetail = {
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
  products: ProductDetail[];
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
  userName: string;
  phoneNumFirst: string;
  phoneNumMiddle: string;
  phoneNumLast: string;
  type: 'BUYER' | 'SELLER';
  businessNumber: string;
  storeName: string;
};

export type LoginState = {
  id: string;
  password: string;
  memberType: 'BUYER' | 'SELLER';
};

export type SelectedType = {
  selected: boolean;
};

export type InputProps = {
  label?: string;
  id: string;
  name?: string;
  type: string;
  placeholder?: string;
  value: string | number;
  min?: number;
  max?: number;
  borderBottomColor?: string;
  show?: 'on' | 'off';
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};
export type ErrorMsgPProps = {
  show?: 'on' | 'off';
};

export type MemberTypeProps = {
  buyerBtnText: string;
  sellerBtnText: string;
  handleTypeChange: (state: 'BUYER' | 'SELLER') => void;
};

export type BuyerFormType = {
  id: string;
  password: string;
  passwordConfirm: string;
  userName: string;
  phoneNumFirst: string;
  phoneNumMiddle: string;
  phoneNumLast: string;
};
export type BuyerJoinFormProps = {
  form: BuyerFormType;
  setForm: any;
};
export type SellerJoinFormProps = {
  form: {
    id: string;
    password: string;
    passwordConfirm: string;
    userName: string;
    phoneNumFirst: string;
    phoneNumMiddle: string;
    phoneNumLast: string;
    type: 'BUYER' | 'SELLER';
    businessNumber: string;
    storeName: string;
  };
  setForm: any;
};

export type PostBuyerForm = {
  username: string; // 아이디
  password: string; // 패스워드
  password2: string; // 패스워드 확인
  phone_number: string; // 전화번호는 10~11자리 숫자
  name: string; // 이름
};

export type PostSellerForm = {
  username: string; // 아이디
  password: string;
  password2: string;
  phone_number: string; // 전화번호는 010으로 시작하는 10~11자리 숫자
  name: string; // 이름
  company_registration_number: string;
  store_name: string;
};

export type LoginDataForm = {
  username: string;
  password: string;
  login_type: string; // BUYER : 일반 구매자, SELLER : 판매자
};

export type CartItemProps = {
  cartProduct: CartListProduct;
  setCartItemList: CartListProduct[];
  setIsChangeModalValue: boolean;
  isOrderBtnClick: boolean;
  isClickAllCheck: boolean;
};

export type CartListProduct = {
  my_cart: number;
  cart_item_id: number;
  is_active: boolean;
  product_id: number;
  quantity: number;
};

export type CartProduct = {
  product_id: number;
  image: string;
  product_name: string;
  store_name: string;
  price: number;
  shipping_fee: number;
  stock: number;
};
export type CartItemDetail = {
  products: ProductDetail[];
};

export type PostSellerProductForm = {
  product_name: string;
  image: any;
  price: number | string;
  shipping_method: 'PARCEL' | 'DELIVERY';
  shipping_fee: number | string;
  stock: number | string;
  product_info?: string;
};
export type PutSellerProductForm = {
  product_name: String;
  price: number | string;
  shipping_method: String;
  shipping_fee: number | string;
  stock: number | string;
  products_info?: String;
};
