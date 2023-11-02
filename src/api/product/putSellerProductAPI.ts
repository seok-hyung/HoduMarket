import { apiURL } from 'api/apiURL';

export const putSellerProductAPI = async (
  token: string,
  product_id: number | string | undefined,
  formData: PutSellerProductForm,
) => {
  try {
    const res = await fetch(`${apiURL}/cart/${product_id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Server error:', text);

      return;
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log('장바구니 상품 업데이트하는데 실패했습니다.', error);
  }
};
type PutSellerProductForm = {
  product_name: String;
  price: number;
  shipping_method: String;
  shipping_fee: number;
  stock: number;
  products_info: String;
};
