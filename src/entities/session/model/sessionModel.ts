import { defineStore } from 'pinia';
import { ref } from 'vue';

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

  const currentUser = () => user.value;
  const addUser = (loginUser: User) => (user.value = loginUser);
  const deleteUser = () => (user.value = null);
  const useAuth = () => user.value?.token;

  return {
    useAuth,
    currentUser,
    addUser,
    deleteUser,
  };
});

// export type UpdateUser = RequiredAtLeastOne<{
//   email: string;
//   password: string;
//   username: string;
//   bio: string;
//   image: string;
// }>;
