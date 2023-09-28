import { QueryClient, useMutation } from '@tanstack/vue-query';
import type { UpdateUser, UserDto } from '@/shared/api/user';
import { userApi } from '@/shared/api';
import { sessionApi } from '@/entities/session';

export const useUpdateCurrentUser = (queryClient: QueryClient) => {
  return useMutation(
    async (user: UpdateUser) => {
      const result = await userApi.updateUser(user);

      return result;
    },
    {
      onMutate: async () => {
        const queryKey = sessionApi.sessionKeys.session.currentUser();
        await queryClient.cancelQueries({ queryKey });

        return { queryKey };
      },
      onSettled: (_data, _error, _valiables, context) => {
        if (!context) return;
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      },
    }
  );
};
