import { apiURL } from 'api/apiURL';
import { PutCartItemForm } from 'model/market';

export async function putCartItemAPI(
  token: string,
  cart_item_id: number | string | undefined,
  formData: PutCartItemForm,
) {
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
      // Not a successful HTTP response, log the text body
      const text = await res.text();
      console.error('Server error:', text);

      return;
    }
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log('장바구니 상품 업데이트하는데 실패했습니다.', error);
  }
}
