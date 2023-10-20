<template>
  <ArticleEditor
    :is-loading="isLoading"
    :is-error="isError"
    :error="error"
    @submit="handleCreateArticle"
  ></ArticleEditor>
</template>

<script setup lang="ts">
import { ArticleEditor } from '@/entities/article';
import { useCreateArticle } from '@/features/article/create';
import type { NewArticleDto } from '@/shared/api/article';
import { useRouter } from 'vue-router/auto';

const { mutate, isLoading, error, isError } = useCreateArticle();
const router = useRouter();
const handleCreateArticle = (article: NewArticleDto) => {
  mutate(article, {
    onSuccess: (article) => {
      router.replace(`/article/${article.slug}`);
    },
  });
};
</script>

<style scoped></style>
