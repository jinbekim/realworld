<template>
  <button
    class="btn btn-sm btn-outline-secondary action-btn"
    @click="toggleFollow"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ text }}
  </button>
</template>
<script setup lang="ts">

import type { Profile } from '@/entities/profile/Profile';
import { computed, toRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  user: Profile;
}>();

const text = computed(() => `Follow ${props.user.username}`);

async function toggleFollow() {
  const profileRepository = Get.get('IProfileRepository');
  if (props.user && props.user.following === true) {
    const ret = await profileRepository.unfollowUser(props.user.username);
    if (ret) {
      props.user.following = false;
    } else router.replace('/login');
  }
}
</script>
