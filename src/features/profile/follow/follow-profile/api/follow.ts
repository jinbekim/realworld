import { QueryClient, useMutation } from "@tanstack/vue-query";
import { profileApi } from '@/shared/api';
import { profileKeys } from "@/entities/profile";
import { articleKeys } from "@/entities/article";

export const useFollowMutation = (queryClient: QueryClient) => useMutation({
  mutationFn: profileApi.followUserByUsername,
  onMutate: async (userName) => {
    const articleQueryKey = articleKeys.article.root;
    const profileQueryKey = profileKeys.profile.username(userName)
    await queryClient.cancelQueries({queryKey: articleQueryKey});
    await queryClient.cancelQueries({queryKey: profileQueryKey});

    return {
      articleQueryKey,
      profileQueryKey,
    }
  },
  onSettled: (_data, _error, _variables, context) => {
    if (!context) return;

    const { articleQueryKey, profileQueryKey } = context;

    queryClient.invalidateQueries({queryKey: articleQueryKey});
    queryClient.invalidateQueries({queryKey: profileQueryKey});
  }
})
