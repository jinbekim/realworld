import { QueryClient, useMutation } from '@tanstack/vue-query';
import { profileApi } from '@/shared/api';
import { profileKeys, type Profile } from '@/entities/profile';
import { articleKeys } from '@/entities/article';

export const useFollowMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async (newUser: Profile) => {
      return await profileApi.followUserByUsername(newUser.username);
    },
    onMutate: async (newUser) => {
      const articleQueryKey = articleKeys.article.root;
      const profileQueryKey = profileKeys.profile.username(newUser.username);
      await queryClient.cancelQueries({ queryKey: articleQueryKey });
      await queryClient.cancelQueries({ queryKey: profileQueryKey });

      const prevProfile: Profile = {
        ...newUser,
        following: false,
      };

      queryClient.setQueryData(profileQueryKey, {
        ...newUser,
        following: true,
      });

      return {
        articleQueryKey,
        profileQueryKey,
        prevProfile,
      };
    },
    onError(_error, _newUser, context) {
      if (!context) return;

      const { articleQueryKey, profileQueryKey, prevProfile } = context;

      queryClient.setQueryData(profileQueryKey, prevProfile);
      queryClient.invalidateQueries({ queryKey: articleQueryKey });
      queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;

      const { articleQueryKey, profileQueryKey } = context;

      queryClient.invalidateQueries({ queryKey: articleQueryKey });
      queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });
