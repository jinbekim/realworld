<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <RouterLink :to="`/@${author.username}`" class="comment-author">
        <img
          :src="author.image"
          class="comment-author-img"
          :alt="author.username"
        />
      </RouterLink>
      &nbsp;
      <RouterLink :to="`/@${author.username}`" class="comment-author">{{
        author.username
      }}</RouterLink>
      <span class="date-posted">{{ comment.createdAt }}</span>
      <slot name="action"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/entities/comment';
import { toRef } from 'vue';

interface Props {
  comment: Comment;
}
const prop = defineProps<Props>();
const author = toRef(() => prop.comment.author);

interface Slots {
  action(): any;
}
defineSlots<Slots>();
</script>

<style scoped></style>
