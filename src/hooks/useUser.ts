import type { User } from "@/domain/User";
import { RealWorldStorage } from "@/infrastructure/storage";
import { ref, type Ref } from "vue";

export type CurrentUser = User;

const useUser = (): Ref<CurrentUser | null> => {
  const user = ref<CurrentUser | null>(RealWorldStorage.get("user"));

  return user;
};

export default useUser;
