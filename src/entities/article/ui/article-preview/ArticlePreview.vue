<template>
  <div class="article-preview">
    <slot name="meta" :article="article"></slot>
    <RouterLink :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="tag of article.tagList"
        >
          {{ tag }}
        </li>
      </ul>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '../../api/article';

interface Props {
  article: Article;
}

defineProps<Props>();

interface Slots {
  meta(props: { article: Article }): any;
}

defineSlots<Slots>();
</script>

<style scoped></style>
