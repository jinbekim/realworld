<template>
  <button
    :disabled="isLoading"
    class="btn btn-outline-primary btn-sm favorite-button"
    @click="onClick"
  >
    <i class="ion-heart"></i>
    <slot>
      <span> &nbsp; Favorite Post</span>
      {{ `(${props.article.favoritesCount})` }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { useFavoriteArticleMutation } from '../api/favorite';
import type { Article } from '@/entities/article';

interface Props {
  article: Article;
}

const props = defineProps<Props>();

const queryClient = useQueryClient();
const { mutate, isLoading } = useFavoriteArticleMutation(queryClient);

const onClick = () => {
  mutate({
    ...props.article,
    favoritesCount: props.article.favoritesCount + 1,
    favorited: true,
  });
};
</script>
