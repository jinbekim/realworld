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
              <template v-if="useAuth()">
                <FavoriteButton
                  v-if="!article.favorited"
                  :article="article"
                  class="pull-xs-right"
                >
                  {{ article.favoritesCount }}
                </FavoriteButton>
                <UnfavoriteButton
                  v-else
                  :article="article"
                  class="pull-xs-right"
                >
                  {{ article.favoritesCount }}
                </UnfavoriteButton>
              </template>
              <template v-else>
                <FavoriteButton
                  :article="article"
                  class="pull-xs-right"
                  @click="() => router.replace('/login')"
                >
                  {{ article.favoritesCount }}
                </FavoriteButton>
              </template>
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
  useGlobalInfinityArticles,
  type GlobalFeedQuery,
  ArticlePreview,
  ArticleMeta,
  ArticleList,
} from '@/entities/article';
import { useSessionStore } from '@/entities/session';
import { FavoriteButton, UnfavoriteButton } from '@/features/article';
import { useRouter } from 'vue-router/auto';

const props = defineProps<GlobalFeedQuery>();

const { useAuth } = useSessionStore();
const router = useRouter();

const {
  data: infinityArticles,
  isLoading,
  isError,
  isSuccess,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
} = useGlobalInfinityArticles(props);
</script>

<style scoped></style>
