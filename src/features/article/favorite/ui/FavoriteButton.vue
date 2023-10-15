<template>
  <button
    :disabled="isLoading"
    class="btn btn-outline-primary btn-sm"
    @click="onClick"
  >
    <i class="ion-heart"></i>
    <slot>
      <span> &nbsp; Favorite Post</span>
      {{ `(${count})` }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { useFavoriteMutation } from '../api/favorite';
import { useQueryClient } from '@tanstack/vue-query';

interface Props {
  slug: string;
  count?: number;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();
const { mutate, isLoading } = useFavoriteMutation(queryClient);

const onClick = () => {
  mutate(props.slug);
};
</script>
