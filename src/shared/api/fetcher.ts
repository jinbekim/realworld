import { useLocalStorage } from '@vueuse/core';

const BaseUrl = import.meta.env.VITE_PUBLIC_API_URL;

const TokenKey = 'user';

export const fetcher = async (path: string, options: RequestInit = {}) => {
  const token = useLocalStorage(TokenKey, '');
  const response = await fetch(BaseUrl + path, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      authorization: `Token ${token.value}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    if (response.status === 401) {
      token.value = '';
    }
    return Promise.reject(new Error('fetch error'));
  }
};
