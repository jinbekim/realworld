<template>
  <!-- <RouterLink :to="`/@${toUrlEncode(props.item.author.username)}`"
    ><img :src="props.item.author.image"
  /></RouterLink> -->

  <div class="info">
    <RouterLink :to="`/@${props.item.author.username}`" class="author">{{
      props.item.author.username
    }}</RouterLink>
    <span class="date">{{ date }}</span>
  </div>
</template>
<script setup lang="ts">
import type { Article } from "@/entities/article";
import { computed } from "vue";
const props = defineProps<{
  item: Article;
}>();

const date = computed(() => {
  return new Date(props.item.createdAt).toDateString();
});
</script>
