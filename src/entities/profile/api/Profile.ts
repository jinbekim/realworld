import { profileApi } from '@/shared/api';
import type { ProfileDto } from '@/shared/api/profile';
import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { toValue, type Ref, computed } from 'vue';

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
  username: Ref<Name>,
  options?: UseQueryOptions<Profile>
) => {
  return useQuery({
    queryKey: computed(() => profileKeys.profile.username(username.value)),
    queryFn: async ({ signal }) => {
      const response = await profileApi.getProfileByUserName(
        toValue(username),
        {
          signal,
        }
      );
      return profileFromDto(response);
    },
    ...options,
  });
};
