<template>
  <button
    :disabled="isLoading"
    class="btn btn-primary btn-sm favorite-button"
    @click="onClick"
  >
    <i class="ion-heart"></i>
    <slot>
      <span> &nbsp; Unfavorite Post</span>
      {{ `(${props.article.favoritesCount})` }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import type { Article } from '@/entities/article';
import { useUnfavoriteArticleMutation } from '../api/unfavorite';

interface Props {
  article: Article;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();
const { mutate, isLoading } = useUnfavoriteArticleMutation(queryClient);

const onClick = () => {
  mutate({
    ...props.article,
    favoritesCount: props.article.favoritesCount - 1,
    favorited: false,
  });
};
</script>
