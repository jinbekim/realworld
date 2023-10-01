import { useMutation } from '@tanstack/vue-query';
import { sessionApi } from '@/entities/session';
import { userApi } from '@/shared/api';

export const useLoginUser = () =>
  useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: userApi.login,
  });
