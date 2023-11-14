import { apiURL } from 'api/apiURL';
import React from 'react';

export const getDetailProductAPI = async (product_id: number | string) => {
  try {
    const res = await fetch(`${apiURL}/products/${product_id}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('네트워크에 문제가 있습니다.');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('디테일 상품 데이터를 가져오는데 문제가 있습니다.', error);
  }
};
