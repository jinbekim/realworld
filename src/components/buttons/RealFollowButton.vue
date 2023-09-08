<template>
  <button
    class="btn btn-sm btn-outline-secondary action-btn"
    @click="toggleFollow"
  >
    <i :class="textIcon"></i>
    &nbsp; {{ text }}
  </button>
</template>
<script setup lang="ts">
import { Get } from '@/dependency';
import type { Profile } from '@/entities/profile/Profile';
import { computed, toRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  user: Profile;
}>();
const user = toRef(props, 'user');

const text = computed(() => {
  if (!user.value) return;
  if (user.value.following) {
    return `Unfollow ${user.value.username}`;
  } else {
    return `Follow ${user.value.username}`;
  }
});
const textIcon = computed(() => {
  if (user.value.following) {
    return 'ion-plus-round';
  } else {
    return 'ion-plus-round';
  }
});

async function toggleFollow() {
  const profileRepository = Get.get('IProfileRepository');
  if (user && !user.value.following) {
    const ret = await profileRepository.followUser(user.value.username);
    if (ret) {
      user.value.following = true;
    } else router.replace('/login');
  } else if (user && user.value.following) {
    const ret = await profileRepository.unfollowUser(user.value.username);
    if (ret) {
      user.value.following = false;
    } else router.replace('/login');
  }
}
</script>
