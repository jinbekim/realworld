import { profileApi } from "@/shared/api";
import { useQuery } from "@tanstack/vue-query";

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

export const useProfile = (username: Name) => {
  return useQuery({
    queryKey: profileKeys.profile.username(username),
    queryFn: async ({signal}) => {
      const response = await profileApi.getProfileByUserName(username, {signal})

    }

  })
}
