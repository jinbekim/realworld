import { Get } from "@/dependency";
import type { User } from "@/domain/User";
import { RealWorldStorage } from "@/infrastructure/storage";
import { isError } from "@/libs/isError";
import { onMounted, ref, type Ref } from "vue";

export type CurrentUser = User;

const useUser = (): Ref<CurrentUser | null> => {
  const user = ref<CurrentUser | null>(RealWorldStorage.get("user"));

  // onMounted(() => {
  //   //update user from repository
  //   const repo = Get.get("IUserRepository");
  //   repo.getCurrentUser().then((profile) => {
  //     if (!isError(profile)) {
  //       RealWorldStorage.set("user", profile);
  //       user.value = profile;
  //     } else {
  //       RealWorldStorage.set("user", null);
  //       user.value = null;
  //     }
  //   });
  // });

  return user;
};

export default useUser;
