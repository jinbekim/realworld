<template>
  <div class="col-md-3">
    <aside class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list" v-loading="isLoading">
        <p v-if="isLoading">{{ 'Loading tags...' }}</p>
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
import { useTags } from '@/entities/tag';
import { vLoading } from '@/shared/directives';

const { data: tags, isLoading } = useTags();
</script>

<style scoped></style>
