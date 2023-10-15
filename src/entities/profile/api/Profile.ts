import { profileApi } from '@/shared/api';
import type { ProfileDto } from '@/shared/api/profile';
import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';

export interface Profile {
  username: Name;
  bio: string;
  image: Url;
  following: boolean;
}

export const profileKeys = {
  profile: {
    root: ['profile'],
    username: (username: string) => [...profileKeys.profile.root, username],
  },
};

export const profileFromDto = (dto: ProfileDto): Profile => {
  return {
    username: dto.username,
    bio: dto.bio,
    image: dto.image,
    following: dto.following,
  };
};

export const useProfile = (
  username: Name,
  options?: UseQueryOptions<Profile>
) => {
  return useQuery({
    queryKey: profileKeys.profile.username(username),
    queryFn: async ({ signal }) => {
      const response = await profileApi.getProfileByUserName(username, {
        signal,
      });
      return profileFromDto(response);
    },
    ...options,
  });
};
