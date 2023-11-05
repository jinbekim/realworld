import { useQuery } from '@tanstack/vue-query';
import { tagApi } from '@/shared/api';
import type { TagDto } from '@/shared/api/tag';

export type Tag = string;

export const tagKeys = {
  tags: {
    root: ['tags'],
  },
};

export const toDomain = (dto: TagDto[]) => {
  return dto;
};
export const useTags = () =>
  useQuery({
    queryKey: tagKeys.tags.root,
    queryFn: async ({ signal }) => {
      const response = await tagApi.getTags({ signal });
      return toDomain(response);
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });
