import { fetcher } from '@/shared/api/fetcher';
import { useQuery } from '@tanstack/vue-query';
import { useSessionStore, type User } from '../model/sessionModel';

export const sessionKeys = {
  session: {
    root: ['session'],
    currentUser: () => [...sessionKeys.session.root, 'currentUser'],
  },

  mutation: {
    login: () => [...sessionKeys.session.root, 'login'],
    create: () => [...sessionKeys.session.root, 'create'],
  },
} as const;

const toDomain = (dto: any): User => {
  return {
    email: dto?.email,
    token: dto?.token,
    username: dto?.username,
    bio: dto?.bio,
    image: dto?.image,
  };
};

export const useCurrentUser = () =>
  useQuery({
    queryKey: sessionKeys.session.currentUser(),
    queryFn: async () => {
      const response = await fetcher('user', {
        method: 'GET',
      });

      const user = toDomain(response.user);

      const { addUser } = useSessionStore();

      addUser(user);

      return user;
    },
  });
