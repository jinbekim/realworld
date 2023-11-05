<template>
  <template v-if="isLoading">
    <div className="article-preview">Loading articles...</div>
  </template>
  <template v-else-if="isError">
    {{ error }}
  </template>
  <template v-else-if="isSuccess">
    <slot
      v-for="article of infinityArticles?.pages[page].articles"
      :article="article"
      name="renderArticles"
    >
    </slot>
  </template>
  <template v-if="hasNextPage">
    <slot name="hasNextPage"></slot>
  </template>
</template>

<script setup lang="ts">
import type { InfiniteData } from '@tanstack/vue-query';
import type { Article } from '../..';
import { ref } from 'vue';

interface Props {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | unknown;
  hasNextPage?: boolean;
  infinityArticles?: InfiniteData<{ articles: Article[]; count: number }>;
}

defineProps<Props>();

const page = ref(0);

defineSlots<{
  renderArticles(props: { article: Article }): any;
  hasNextPage(props: {}): any;
}>();
</script>

<style scoped></style>
