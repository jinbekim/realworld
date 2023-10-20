<template>
  <ArticleEditor
    :article="data"
    :error="updateError"
    :is-error="isUpdateError"
    :is-loading="isArticleLoading"
    @submit="handleArticleEdit"
  ></ArticleEditor>
</template>

<script setup lang="ts">
import { ArticleEditor, useArticle } from '@/entities/article';
import { useUpdateArticleMutation } from '@/features/article';
import type { UpdateArticleDto } from '@/shared/api/article';
import { useRouter } from 'vue-router/auto';

interface Props {
  slug: string;
}

const props = defineProps<Props>();
const { data, isLoading: isArticleLoading } = useArticle(props.slug);

const router = useRouter();

const {
  mutate,
  error: updateError,
  isError: isUpdateError,
} = useUpdateArticleMutation();

const handleArticleEdit = (dto: UpdateArticleDto) => {
  mutate(
    { slug: props.slug, article: dto },
    {
      onSuccess: (article) => {
        router.push(`/article/${article.slug}`);
      },
    }
  );
};
</script>

<style scoped></style>
