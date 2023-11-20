<template>
  <template v-if="isLoading">
    <div class="article-preview">Loading articles...</div>
  </template>
  <template v-else-if="isError">
    {{ error }}
  </template>
  <template v-else-if="isSuccess">
    <slot
      v-for="article of infinityArticles?.pages.flatMap((v) => v.articles)"
      :article="article"
      name="renderArticles"
    >
    </slot>
  </template>
  <template v-if="hasNextPage">
    <div style="display: flex; justify-content: center">
      <slot name="hasNextPage"></slot>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { InfiniteData } from '@tanstack/vue-query';
import type { Article } from '../..';

interface Props {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | unknown;
  hasNextPage?: boolean;
  infinityArticles?: InfiniteData<{ articles: Article[]; count: number }>;
}

defineProps<Props>();

defineSlots<{
  renderArticles(props: { article: Article }): any;
  hasNextPage(props: {}): any;
}>();
</script>

<style scoped></style>
