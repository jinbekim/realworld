import { useLocalStorage } from '@vueuse/core';
import { getErrorMessage } from './utils';

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
  if (response.status === 204) return;
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    if (response.status === 401) {
      token.value = '';
    }
    return Promise.reject(getErrorMessage(data.errors));
  }
};
