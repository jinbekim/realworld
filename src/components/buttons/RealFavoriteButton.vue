<template>
  <button
    class="btn btn-outline-primary btn-sm"
    :class="{ active: item.favorited, 'pull-xs-right': !full }"
    @click="() => toggleFavorite(props.item)"
  >
    <i class="ion-heart"></i>
    <span v-if="props.full"> &nbsp; Favorite Post</span>
    {{ item.favoritesCount }}
  </button>
</template>
<script setup lang="ts">
import { Get } from "@/dependency";
import type { Article } from "@/domain/Article";
import { isError } from "@/libs/isError";
import { toRefs } from "vue";

const props = defineProps<{
  item: Article;
  full?: boolean;
}>();

/// FIXME: toref 제대로 쓰기
const { item, full } = toRefs(props);

let timer: number = 0;
async function toggleFavorite(item: Article) {
  console.log("toggle");
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    const repo = Get.get("IFavoriteRepository");
    console.log("set timeout");
    if (item.favorited) {
      const result = await repo.remove(item.slug);
      if (!isError(result)) {
        item.favorited = result.favorited;
        item.favoritesCount = result.favoritesCount;
      }
    } else {
      const result = await repo.add(item.slug);
      if (!isError(result)) {
        item.favorited = result.favorited;
        item.favoritesCount = result.favoritesCount;
      }
    }
  }, 300);
}
</script>
