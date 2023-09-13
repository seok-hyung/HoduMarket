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

export type LoginForm = {
  username: string;
  password: string;
  login_type: string; // BUYER : 일반 구매자, SELLER : 판매자
};
