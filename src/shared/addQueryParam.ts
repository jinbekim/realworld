export const addQueryParam = (url: string, key: string, value: string) => {
  if (!value) return url;
  return `${url}${url.includes("?") ? "&" : "?"}${key}=${value}`;
};
