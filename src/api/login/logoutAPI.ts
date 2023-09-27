import { apiURL } from 'api/apiURL';

export const logOutAPI = async () => {
  const res = await fetch(`${apiURL}/accounts/logout/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error(errorData);
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
};
