import { Get } from "@/dependency";
import type { User } from "@/entities/session/model/sessionModel";
import { RealWorldStorage } from "@/infrastructure/storage";
import router from "@/router";
import { reactive } from "vue";

export const useUpdateUser = (defaultValue: User | null) => {
  const userModel = reactive({
    isLoading: false,
    isError: false,
    password: "",
    image: defaultValue?.image,
    username: defaultValue?.username,
    bio: defaultValue?.bio,
    email: defaultValue?.email,
  });

  const updateUser = async () => {
    // const userRepository = Get.get("IUserRepository");
    // userModel.isLoading = true;
    // const result = await userRepository.updateCurrentUser({
    //   ...userModel,
    // });
    // userModel.isLoading = false;
    // if (result) return router.replace("/login");
    // else {
    //   RealWorldStorage.set("user", result);
    //   router.replace(`/@${result.username}`);
    // }
  };

  return {
    userModel,
    updateUser,
  };
};
