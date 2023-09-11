<template>
  <!-- <router-link :to="`/@${toUrlEncode(props.item.author.username)}`"
    ><img :src="props.item.author.image"
  /></router-link> -->

  <div class="info">
    <router-link :to="`/@${props.item.author.username}`" class="author">{{
      props.item.author.username
    }}</router-link>
    <span class="date">{{ date }}</span>
  </div>
</template>
<script setup lang="ts">
import type { Article } from "@/entities/article/Article";
import type { toUrlEncode } from "@/shared/api/encodeURL";
import { computed } from "vue";
const props = defineProps<{
  item: Article;
}>();

const date = computed(() => {
  return new Date(props.item.createdAt).toDateString();
});
</script>
