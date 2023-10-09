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
  type GlobalfeedQuery,
  useGlobalInfinityArticles,
  ArticlePreview,
  ArticleMeta,
} from '@/entities/article';
import { FavoriteButton } from '@/features/article/favorite';
import UnfavoriteButton from '@/features/article/favorite/ui/UnfavoriteButton.vue';
import { computed } from 'vue';
import { vLoading } from '@/shared/directives';

const props = defineProps<GlobalfeedQuery>();
const qeury = computed(() => props);

const { data, isLoading } = useGlobalInfinityArticles(qeury);
</script>

<style scoped></style>
