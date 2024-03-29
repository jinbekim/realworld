import { useMutation } from '@tanstack/vue-query';
import { sessionKeys } from '@/entities/session';
import { userApi } from '@/shared/api';

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: sessionKeys.mutation.register(),
    mutationFn: userApi.register,
  });
};
