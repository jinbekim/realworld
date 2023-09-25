<template>
  <button
    class="btn btn-sm btn-outline-secondary action-btn"
    @click="unfollow"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ `Follow ${props.user.username}` }}
  </button>
</template>
<script setup lang="ts">
import type { Profile } from '@/entities/profile';
import { useQueryClient } from '@tanstack/vue-query';
import { useUnfollowMutation } from '../api/unfollow';

interface Props  {
  user: Profile
}
const props = defineProps<Props>();

  const queryClient = useQueryClient();
const unfollowUser = useUnfollowMutation(queryClient);

async function unfollow() {
  if (props.user && props.user.following === true)
    unfollowUser.mutate(props.user.username);
}
</script>
