<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <RouterLink :to="`/@${comment.author.username}`" class="comment-author">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
      </RouterLink>
      &nbsp;
      <RouterLink :to="`/@${comment.author.username}`" class="comment-author">{{
        comment.author.username
      }}</RouterLink>
      <span class="date-posted">{{ comment.createdAt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/entities/comment';

interface Props {
  comment: Comment;
}
defineProps<Props>();
</script>

<style scoped></style>
