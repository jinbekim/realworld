<template>
  <ArticleMeta :article="article">
    <template #actionSlot>
      <RouterLink
        class="btn btn-sm btn-outline-secondary action-btn"
        :to="`/editor/${article.slug}`"
      >
        <i class="ion-gear-a"></i>
        &nbsp; Edit Article
      </RouterLink>
      &nbsp;
      <DeleteArticleButton :slug="article.slug"></DeleteArticleButton>
    </template>
  </ArticleMeta>
</template>

<script setup lang="ts">
import { DeleteArticleButton } from '@/features/article/delete';
import { RouterLink } from 'vue-router';
import { ArticleMeta, type Article } from '@/entities/article';

interface Props {
  article: Article;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
