import { QueryClient, useMutation } from '@tanstack/vue-query';
import type { UpdateUserDto } from '@/shared/api/user';
import { userApi } from '@/shared/api';
import { sessionKeys } from '@/entities/session';

export const useUpdateCurrentUser = (queryClient: QueryClient) => {
  return useMutation(
    async (user: UpdateUserDto) => {
      const result = await userApi.updateUser(user);

      return result;
    },
    {
      onMutate: async () => {
        const queryKey = sessionKeys.session.currentUser();
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
