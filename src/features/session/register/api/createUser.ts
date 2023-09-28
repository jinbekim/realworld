import { useMutation } from '@tanstack/vue-query';
import { sessionApi } from '@/entities/session';
import { userApi } from '@/shared/api';

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.register(),
    mutationFn: userApi.register,
  });
};
