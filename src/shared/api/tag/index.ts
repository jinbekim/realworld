import { fetcher } from "../fetcher";

export type TagDto = string;

export const getTags = async () => {
  const response = await fetcher(`tags`, {
    method: 'GET',
  });
  return response.tags;
}
