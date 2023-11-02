import { apiURL } from 'api/apiURL';

export const putCartItemAPI = async (
  token: string,
  cart_item_id: number | string | undefined,
  formData: PutCartItemForm,
) => {
  try {
    const res = await fetch(`${apiURL}/cart/${cart_item_id}/`, {
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
type PutCartItemForm = {
  product_id: number;
  quantity: number;
  is_active: boolean;
};
