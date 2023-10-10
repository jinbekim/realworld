<template>
    <button class="btn btn-sm btn-outline-secondary action-btn" @click="$router.push('/login')">
    <i class="ion-plus-round"></i>
    &nbsp; {{ `Follow ${article.author.username}` }}
  </button>
  &nbsp;
  <button
    class="btn btn-outline-primary btn-sm"
    :class="class"
    @click="$router.push('/login')"
  >
    <i class="ion-heart"></i>
    <slot>
      <span> &nbsp; Favorite Post</span>
      {{ `(${article.favoritesCount})` }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import type { Article } from '@/entities/article';

interface Props {
  article: Article;
}

  defineProps<Props>();
</script>

<style scoped>

</style>
