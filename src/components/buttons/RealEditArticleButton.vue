<template>
  <button
    class="btn btn-sm btn-outline-secondary action-btn"
    @click="() => $router.push(`/editor/${slug})`)"
  >
    <i class="ion-gear-a"></i>
    &nbsp; Edit Article
  </button>
</template>
<script setup lang="ts">
import { toUrlEncode } from "@/libs/encodeURL";
import { computed } from "vue";

const props = defineProps<{
  slug: string;
}>();
const slug = computed(() => toUrlEncode(props.slug));
</script>
