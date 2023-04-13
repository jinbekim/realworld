import { Get } from "@/dependency";
import type { IUserRepository } from "@/domain/IUserRepository";
import type { User } from "@/domain/User";
import { RealWorldStorage } from "@/infrastructure/storage";
import { isError } from "@/libs/isError";
import { ref, type Ref } from "vue";

export type CurrentUser = User;

const useUser = (): Ref<CurrentUser | null> => {
  const user = ref<CurrentUser | null>(RealWorldStorage.get("user"));
  const userRepository = Get.get<IUserRepository>("IUserRepository");
  userRepository.getCurrentUser().then((result) => {
    if (isError(result)) {
      return;
    }
    user.value = result;
  });

  return user;
};

export default useUser;
