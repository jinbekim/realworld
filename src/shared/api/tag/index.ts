import { fetcher } from "../fetcher";

export type TagDto = string;

export const getTags = async (options: RequestInit = {}): Promise<TagDto[]> => {
  const response = await fetcher(`tags`, {
    method: 'GET',
    ...options
  });
  return response.tags;
}
