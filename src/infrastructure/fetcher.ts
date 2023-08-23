import { RealWorldStorage } from './storage';
const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;

const TokenKey = 'user';

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(baseUrl + url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      authorization: RealWorldStorage.get(TokenKey)?.token
        ? `Token ${RealWorldStorage.get(TokenKey).token}`
        : '',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    if (response.status === 401) {
      RealWorldStorage.set(TokenKey, null);
    }
    return Promise.reject<GenericError>(data);
  }
};
