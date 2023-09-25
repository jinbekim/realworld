<template>
  <button
    class="btn btn-sm btn-outline-secondary action-btn"
    @click="follow"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ `Unfollow ${user.username}` }}
  </button>
</template>

<script setup lang="ts">
import type { Profile } from '@/entities/profile';
import { useFollowMutation } from '../api/follow';
import { useQueryClient } from '@tanstack/vue-query';

interface Props  {
  user: Profile
}
const props = defineProps<Props>();

const queryClient = useQueryClient();
const followUser = useFollowMutation(queryClient);

async function follow() {
  if (props.user && props.user.following === false)
    followUser.mutate(props.user.username);
}
</script>
