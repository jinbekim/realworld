<template>
  <div v-if="isLoading" class="article-preview">
    <h1>Loading...</h1>
    <p>Loading...</p>
  </div>
  <template v-else-if="items?.length">
    <real-post-tile v-for="item in items" :item="item" />
  </template>
  <div v-else>
    <p>No articles are here... yet.</p>
  </div>
</template>
<script setup lang="ts">
import RealPostTile from "@/components/RealPostTile.vue";
import type { Article } from "@/entities/article/Article";
import { toRefs } from "vue";

const props = defineProps<{
  isLoading: boolean;
  items: Article[];
}>();
console.log(props.items);
const { isLoading, items } = toRefs(props);
</script>
