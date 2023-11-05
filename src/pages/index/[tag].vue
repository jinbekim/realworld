<route lang="json">
{
  "props": true
}
</route>
<template>
  <ArticlePreview
    v-for="article of data?.pages[0]"
    :article="article"
  ></ArticlePreview>
</template>

<script setup lang="ts">
import {
  useGlobalInfinityArticles,
  type GlobalFeedQuery,
  ArticlePreview,
} from '@/entities/article';
import { computed } from 'vue';

const props = defineProps<GlobalFeedQuery>();
const qeury = computed(() => props);

const { data, isLoading } = useGlobalInfinityArticles(qeury);
</script>
