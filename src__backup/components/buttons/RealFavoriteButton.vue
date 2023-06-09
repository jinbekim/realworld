<template>
  <button
    :disabled="isLoading"
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
import useUser from "@/store/useUser";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "lodash";

const props = defineProps<{
  item: Article;
  full?: boolean;
}>();

const { item, full } = toRefs(props);
const isLoading = ref(false);
const router = useRouter();
const user = useUser();

const toggleFavorite = debounce(async (item: Article) => {
  const repo = Get.get("IFavoriteRepository");
  console.log("set timeout");
  if (item.favorited) {
    const result = await repo.remove(item.slug);
    if (!isError(result)) {
      item.favorited = result.favorited;
      item.favoritesCount = result.favoritesCount;
    } else {
      router.push("/login");
    }
  } else {
    const result = await repo.add(item.slug);
    if (!isError(result)) {
      item.favorited = result.favorited;
      item.favoritesCount = result.favoritesCount;
    } else {
      router.push("/login");
    }
  }
  isLoading.value = false;
}, 300);
</script>
