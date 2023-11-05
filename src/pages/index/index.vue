<template>
  <span v-loading="isLoading" v-if="isLoading">{{
    'Loading articles...'
  }}</span>
  <ArticlePreview v-for="article of data?.pages[0]" :article="article">
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
          <UnfavoriteButton v-else :slug="article.slug" class="pull-xs-right">
            {{ article.favoritesCount }}
          </UnfavoriteButton>
        </template>
      </ArticleMeta>
    </template>
  </ArticlePreview>
</template>

<script setup lang="ts">
import {
  type GlobalFeedQuery,
  useGlobalInfinityArticles,
  ArticlePreview,
  ArticleMeta,
} from '@/entities/article';
import { FavoriteButton, UnfavoriteButton } from '@/features/article/favorite';
import { ref } from 'vue';
import { vLoading } from '@/shared/directives';

const query = ref<GlobalFeedQuery>({
  offset: 0,
  limit: 20,
});

const { data, isLoading } = useGlobalInfinityArticles(query);
</script>

<style scoped></style>
