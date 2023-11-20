<template xmlns="http://www.w3.org/1999/html">
  <ArticleList
    :infinityArticles="infinityArticles"
    :isLoading="isLoading"
    :isError="isError"
    :isSuccess="isSuccess"
    :error="error"
    :hasNextPage="hasNextPage"
  >
    <template #renderArticles="{ article }">
      <ArticlePreview :article="article">
        <template #meta>
          <ArticleMeta :article="article">
            <template #actionSlot>
              <FavoriteButton
                v-if="!article.favorited"
                :article="article"
                class="pull-xs-right"
              >
                {{ article.favoritesCount }}
              </FavoriteButton>
              <UnfavoriteButton v-else :article="article" class="pull-xs-right">
                {{ article.favoritesCount }}
              </UnfavoriteButton>
            </template>
          </ArticleMeta>
        </template>
      </ArticlePreview>
    </template>
    <template #hasNextPage>
      <button
        class="btn btn-outline-primary btn-sm"
        @click="() => fetchNextPage()"
        :disabled="!hasNextPage || isFetchingNextPage"
      >
        <span v-show="isFetchingNextPage">
          {{ 'Loading more...' }}
        </span>
        <span v-show="!isFetchingNextPage">{{ 'Load More' }}</span>
      </button>
    </template>
  </ArticleList>
</template>

<script setup lang="ts">
import {
  useUserInfinityArticles,
  type UserFeedQuery,
  ArticlePreview,
  ArticleMeta,
  ArticleList,
} from '@/entities/article';
import { FavoriteButton, UnfavoriteButton } from '@/features/article';

const props = defineProps<UserFeedQuery>();

const {
  data: infinityArticles,
  isLoading,
  isError,
  isSuccess,
  error,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
} = useUserInfinityArticles(props);
</script>

<style scoped></style>
