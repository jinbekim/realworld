import { useMutation } from '@tanstack/vue-query';
import { sessionApi } from '@/entities/session';
import type { User } from '@/entities/session/model/sessionModel';
import { fetcher } from '@/shared/api/fetcher';

export interface LoginUserDto {
  email: string;
  password: string;
}

export const useLoginUser = () => {
  return useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.login(),
    mutationFn: async (user: LoginUserDto) => {
      const response: { user: User } = await fetcher('users/login', {
        method: 'POST',
        body: JSON.stringify({ user: user }),
      });
      return response.user;
    },
  });
};
