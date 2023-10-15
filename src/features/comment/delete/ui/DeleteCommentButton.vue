<template>
  <button
    :disabled="isLoading"
    style="border: 0; background-color: transparent"
    class="mod-options"
    type="button"
    @click="onClick"
  >
    <i class="ion-trash-a"></i>
  </button>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useDeleteCommentMutation } from '../api/delete';

interface Props {
  slug: string;
  id: number;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();
const { mutateAsync, isLoading } = useDeleteCommentMutation(queryClient);
const onClick = async () => {
  await mutateAsync({ slug: props.slug, id: props.id });
};
</script>

<style scoped></style>
