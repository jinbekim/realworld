<template>
  <div class="col-md-3">
    <aside class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        <RouterLink
          v-for="tag in tags"
          :to="`/${tag}`"
          class="tag-pill tag-default ng-binding ng-scope"
        >
          {{ tag }}
        </RouterLink>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tags: string[];
}
defineProps<Props>();
</script>
