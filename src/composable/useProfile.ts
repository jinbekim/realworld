import { Get } from "@/dependency";
import type { Profile } from "@/domain/Profile";
import { isError } from "@/libs/isError";
import { ref, watchEffect } from "vue";

export const useProfile = (username: string) => {
  const profile = ref<Profile>();

  const fetchProfile = async (username: string) => {
    const repo = Get.get("IProfileRepository");
    const result = await repo.getProfile(username);
    if (!isError(result)) return result;
    else throw new Error("Error fetching profile");
  };

  watchEffect(async () => {
    profile.value = await fetchProfile(username);
  });

  return {
    profile,
  };
};
