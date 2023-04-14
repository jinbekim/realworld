<template>
  <button
    class="btn btn-sm btn-outline-secondary action-btn"
    @click="followUser"
  >
    <i :class="textIcon"></i>
    &nbsp; {{ text }}
  </button>
</template>
<script setup lang="ts">
import { Get } from "@/dependency";
import useUser from "@/hooks/useUser";
import { isError } from "@/libs/isError";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Profile } from "@/domain/Profile";

const router = useRouter();
const text = ref("");
const textIcon = ref("");

const currentUser = useUser();
const { user } = defineProps({
  user: {
    type: Object as () => Profile,
    required: true,
  },
});

onMounted(async () => {
  if (user.username === currentUser.value?.username) {
    text.value = "Edit Profile Settings";
    textIcon.value = "ion-gear-a";
  } else if (user.following) {
    text.value = `Unfollow ${user.username}`;
    textIcon.value = "ion-plus-round";
  } else {
    text.value = `Follow ${user.username}`;
    textIcon.value = "ion-plus-round";
  }
});
async function followUser() {
  const profileRepository = Get.get("IProfileRepository");
  if (user && user.username === currentUser.value?.username) {
    router.push("/settings");
  }
  if (user && !user.following) {
    const ret = await profileRepository.followUser(user.username);
    if (!isError(ret)) {
      user.following = true;
      text.value = `UnFollow ${user.username}`;
    } else router.replace("/login");
  } else if (user && user.following) {
    const ret = await profileRepository.unfollowUser(user.username);
    if (!isError(ret)) {
      user.following = false;
      text.value = `Follow ${user.username}`;
    } else router.replace("/login");
  }
}
</script>
