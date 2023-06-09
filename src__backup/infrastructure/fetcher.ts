import { RealWorldStorage } from "./storage";
const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(baseUrl + url, options);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    if (response.status === 401) {
      RealWorldStorage.set("user", null);
    }
    return Promise.reject<GenericError>(data);
  }
};
