import { sessionKeys } from '@/entities/session/api/sessionApi';
import { useSessionStore } from '@/entities/session/model/sessionModel';
import { QueryClient } from '@tanstack/vue-query';

export const logout = (queryclient: QueryClient) => {
  const { deleteUser } = useSessionStore();

  deleteUser();
  queryclient.removeQueries(sessionKeys.session.currentUser());
};
