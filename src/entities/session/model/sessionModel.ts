import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface User {
  email: Email;
  token: Token;
  username: Name;
  bio: Text;
  image: Url;
}

const StoreId = 'Session';
export const useSessionStore = defineStore(StoreId, () => {
  const user = ref<User | null>(null);

  const useCurrentUser = () => user.value;
  const addUser = (loginUser: User) => (user.value = loginUser);
  const deleteUser = () => (user.value = null);
  const useAuth = () => user.value?.token;

  return {
    useAuth,
    useCurrentUser,
    addUser,
    deleteUser,
  };
});

export const useCurrentUser = () => useSessionStore().useCurrentUser();

// export interface LoginUser {
//   email: string;
//   password: string;
// }

// export interface NewUser {
//   username: string;
//   email: string;
//   password: string;
// }

// export type UpdateUser = RequiredAtLeastOne<{
//   email: string;
//   password: string;
//   username: string;
//   bio: string;
//   image: string;
// }>;
