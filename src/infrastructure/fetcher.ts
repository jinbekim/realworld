const baseUrl = import.meta.env.PUBLIC_API_URL;

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(baseUrl + url, options);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject<GenericError>(data);
  }
};
