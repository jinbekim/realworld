export const toUrlEncode = (url: string): string => {
  return encodeURIComponent(url);
};

export const toUrlDecode = (url: string): string => {
  return decodeURIComponent(url);
};
