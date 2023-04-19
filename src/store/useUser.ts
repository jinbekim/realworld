import { Get } from "@/dependency";
import type { User } from "@/domain/User";
import { RealWorldStorage } from "@/infrastructure/storage";
import { isError } from "@/libs/isError";
import { ref } from "vue";
import { useRouter } from "vue-router";

const useUser = () => {
  const router = useRouter();
  const user = ref<User | null>(RealWorldStorage.get("user"));

  const logout = () => {
    RealWorldStorage.set("user", null);
    user.value = null;
    router.replace("/");
  };

  const refetch = async () => {
    const repo = Get.get("IUserRepository");
    await repo.getCurrentUser().then((result) => {
      if (!isError(result)) {
        user.value = result;
        RealWorldStorage.set("user", result);
      }
    });
  };

  return {
    user,
    logout,
    refetch,
  };
};

export default useUser;
