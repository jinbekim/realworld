import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface User {
  email: Email;
  token: Token;
  username: Name;
  bio: string;
  image: Url;
}

const StoreId = 'Session';
export const useSessionStore = defineStore(StoreId, () => {
  const user = ref<User | null>(null);

  const useAuth = () => user.value?.token;
  const addUser = (loginUser: User) => (user.value = loginUser);
  const deleteUser = () => (user.value = null);

  return {
    useAuth,
    currentUser: user,
    addUser,
    deleteUser,
  };
});
