<template>
  <button
    :disabled="isLoading"
    class="btn btn-outline-primary btn-sm"
    :class="class"
    @click="onClick"
  >
    <i class="ion-heart"></i>
    <slot>
      <span> &nbsp; Unfavorite Post</span>
      {{ count }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useUnfavoriteMutation } from '../api/unfavorite';

interface Props {
  slug: string;
  count?: number;
  class?: string;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();
const { mutate, isLoading } = useUnfavoriteMutation(queryClient);

const onClick = () => {
  mutate(props.slug);
};
</script>
