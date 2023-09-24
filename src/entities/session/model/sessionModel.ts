import { defineStore } from 'pinia';
import { ref, toRef } from 'vue';

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
  const isAuth = toRef(() => !!user.value?.token);

  const addUser = (loginUser: User) => (user.value = loginUser);
  const deleteUser = () => (user.value = null);

  return {
    isAuth,
    currentUser: user,
    addUser,
    deleteUser,
  };
});

