<template>
  <CommentCard v-for="comment of data" :comment="comment">
    <template #action>
      <DeleteCommentButton :slug="slug" :id="comment.id"></DeleteCommentButton>
    </template>
  </CommentCard>
</template>

<script setup lang="ts">
import { CommentCard, useComment } from '@/entities/comment';
import { DeleteCommentButton } from '@/features/comment/delete';

interface Props {
  slug: string;
}
const props = defineProps<Props>();

const { data, isLoading } = useComment(props.slug);
</script>

<style scoped></style>
