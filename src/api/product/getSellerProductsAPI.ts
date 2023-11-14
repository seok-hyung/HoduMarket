import React from 'react';
import { apiURL } from 'api/apiURL';

export const getSellerProductsAPI = async (token: string) => {
  try {
    const res = await fetch(`${apiURL}/seller/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('네트워크에 문제가 있습니다.');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('판매자 상품을 가져오는데 문제가 있습니다.', error);
    throw error;
  }
};
