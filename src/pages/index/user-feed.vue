<route lang="json">
{
  "meta": {
    "requiresAuth": true
  }
}
</route>
<template>
  {{ 'hi' }}
</template>

<script setup lang="ts">
import {
  useUserInfinityArticles,
  type UserfeedQuery,
} from '@/entities/article';
import { ref } from 'vue';

const query = ref<UserfeedQuery>({
  offset: 0,
  limit: 20,
});

const articles = useUserInfinityArticles(query);
</script>

<style scoped></style>
