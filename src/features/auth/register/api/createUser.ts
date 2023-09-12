import { useMutation } from '@tanstack/vue-query';
import { sessionApi } from '@/entities/session';
import type { User } from '@/entities/session/model/sessionModel';
import { fetcher } from '@/shared/api/fetcher';

export interface NewUserDto {
  username: string;
  email: string;
  password: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationKey: sessionApi.sessionKeys.mutation.create(),
    mutationFn: async (user: NewUserDto) => {
      const response: { user: User } = await fetcher('users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });
      return response.user;
    },
  });
};
