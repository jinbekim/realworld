<template>
  <RouterLink
    class="btn btn-sm btn-outline-secondary action-btn"
    :to="`/editor/${slug}`"
  >
    <i class="ion-gear-a"></i>
    &nbsp; Edit Article
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

interface Props {
  slug: UniqueId;
}

defineProps<Props>();
</script>

<style scoped>

</style>
