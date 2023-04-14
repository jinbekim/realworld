import { RealWorldStorage } from "./storage";
const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;

/**
 * 매크로 함수와, useRouter를 사용하려고 했지만
 * 각종 워닝과 에러가 발생하여, 일단은 이렇게 작성했다.
 * 그 원인을 분석해서 공부하면 vue의 생명 주기에 대해 좀 더 잘 알 수 있을것 같다.
 */
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
