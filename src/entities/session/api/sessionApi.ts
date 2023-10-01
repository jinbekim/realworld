import { useQuery } from '@tanstack/vue-query';
import { useSessionStore, type User } from '../model/sessionModel';
import { userApi } from '@/shared/api';
import type { UserDto } from '@/shared/api/user';
import type { MaybeRef } from 'vue';

export const sessionKeys = {
  session: {
    root: ['session'],
    currentUser: () => [...sessionKeys.session.root, 'currentUser'],
  },

  mutation: {
    login: () => [...sessionKeys.session.root, 'login'],
    register: () => [...sessionKeys.session.root, 'register'],
  },
} as const;

export const userFromDto = (dto: UserDto): User => {
  return {
    email: dto.email,
    token: dto.token,
    username: dto.username,
    bio: dto.bio,
    image: dto.image,
  };
};

export const useCurrentUser = (enabled: MaybeRef<boolean | undefined>) =>
  useQuery({
    queryKey: sessionKeys.session.currentUser(),
    queryFn: async () => {
      const response = await userApi.currentUser();
      const { addUser } = useSessionStore();

      const user = userFromDto(response);
      addUser(user);

      return user;
    },
    enabled,
  });
