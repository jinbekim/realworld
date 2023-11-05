<template>
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
                :slug="article.slug"
                class="pull-xs-right"
              >
                {{ article.favoritesCount }}
              </FavoriteButton>
              <UnfavoriteButton
                v-else
                :slug="article.slug"
                class="pull-xs-right"
              >
                {{ article.favoritesCount }}
              </UnfavoriteButton>
            </template>
          </ArticleMeta>
        </template>
      </ArticlePreview>
    </template>
    <template #hasNextPage></template>
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
import { toRef } from 'vue';
import { FavoriteButton, UnfavoriteButton } from '@/features/article';

const props = defineProps<UserFeedQuery>();

const {
  data: infinityArticles,
  isLoading,
  isError,
  isSuccess,
  error,
  hasNextPage,
} = useUserInfinityArticles(toRef(() => props));
</script>

<style scoped></style>
