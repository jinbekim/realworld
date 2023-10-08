import { sessionKeys, useSessionStore } from '@/entities/session';
import { QueryClient } from '@tanstack/vue-query';

export const logout = (queryclient: QueryClient) => {
  const { deleteUser } = useSessionStore();

  deleteUser();
  queryclient.removeQueries(sessionKeys.session.currentUser());
};
