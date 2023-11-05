<template>
  <div class="col-md-3">
    <aside class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list" v-loading="isLoading">
        <p v-if="isLoading">{{ 'Loading tags...' }}</p>
        <button
          v-for="tag in tags"
          class="tag-pill tag-default ng-binding ng-scope remove-border"
          @click="$emit('click', tag)"
        >
          {{ tag }}
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useTags } from '@/entities/tag';
import { vLoading } from '@/shared/directives';

const { data: tags, isLoading } = useTags();

defineEmits<{
  (e: 'click', tag: string): string;
}>();
</script>

<style scoped>
.remove-border {
  border: 0;
}
</style>
