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
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  user: Profile;
}>();

const text = computed(() => `Unfollow ${props.user.username}`);

async function toggleFollow() {
  const profileRepository = Get.get('IProfileRepository');
  if (props.user && props.user.following === false) {
    const ret = await profileRepository.followUser(props.user.username);
    if (ret) {
      props.user.following = true;
    } else router.replace('/login');
  }
}
</script>
