<template>
  <div class="article-meta">
    <RouterLink :to="`/@${author.username}`"
      ><img :src="author.image"
    /></RouterLink>
    <div class="info">
      <RouterLink :to="`/@${author.username}`" class="author">{{
        author.username
      }}</RouterLink>
      <span class="date">{{ article.createdAt }}</span>
    </div>
    <slot name="actionSlot"></slot>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import type { Article } from '../../api/article';

interface Props {
  article: Article;
}
const props = defineProps<Props>();
const author = toRef(() => props.article.author);

interface Slots {
  actionSlot(): any;
}
defineSlots<Slots>();
</script>

<style scoped></style>
