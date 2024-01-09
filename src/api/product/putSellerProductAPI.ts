import { apiURL } from 'api/apiURL';
import { PutSellerProductForm } from 'model/market';

export const putSellerProductAPI = async (
  token: string,
  product_id: number | string,
  formData: PutSellerProductForm,
) => {
  try {
    const res = await fetch(`${apiURL}/products/${product_id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      console.error('Server error');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('장바구니 상품 업데이트하는데 실패했습니다.', error);
  }
};
