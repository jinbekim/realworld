import { useMutation } from '@tanstack/vue-query';
import { sessionKeys } from '@/entities/session';
import { userApi } from '@/shared/api';

export const useLoginUser = () =>
  useMutation({
    mutationKey: sessionKeys.mutation.login(),
    mutationFn: userApi.login,
  });
