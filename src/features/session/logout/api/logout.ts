import { sessionApi, sessionModel } from '@/entities/session';
import { QueryClient } from '@tanstack/vue-query';

export const logout = (queryclient: QueryClient) => {
  const { deleteUser } = sessionModel.useSessionStore();

  deleteUser();
  queryclient.removeQueries(sessionApi.sessionKeys.session.currentUser());
};
