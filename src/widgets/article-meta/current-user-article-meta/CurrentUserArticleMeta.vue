<template>
  <RouterLink
    class="btn btn-sm btn-outline-secondary action-btn"
    :to="`/editor/${slug}`"
  >
    <i class="ion-gear-a"></i>
    &nbsp; Edit Article
  </RouterLink>
  &nbsp;
  <DeleteArticleButton :slug="slug"></DeleteArticleButton>
</template>

<script setup lang="ts">
import { DeleteArticleButton } from "@/features/article/delete";
import { RouterLink } from "vue-router";

interface Props {
  slug: UniqueId;
}

defineProps<Props>();
</script>

<style scoped>

</style>
