<route lang="json">
{
  "props": true,
  "meta": {
    "requiresAuth": true
  }
}
</route>
<script setup lang="ts">
import { CurrentArticleEditor } from '@/widgets/current-article-editor';
import { NewArticleEditor } from '@/widgets/new-article-editor';

defineProps<{
  slug?: string;
}>();
</script>

<template>
  <template v-if="!slug">
    <NewArticleEditor></NewArticleEditor>
  </template>
  <template v-else>
    <CurrentArticleEditor :slug="slug"></CurrentArticleEditor>
  </template>
</template>
