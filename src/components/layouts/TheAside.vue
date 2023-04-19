<template>
  <div class="col-md-3">
    <aside class="sidebar">
      <p>Popular Tags</p>
      <span v-if="isLoading">Loading...</span>
      <div v-else class="tag-list">
        <router-link
          v-for="tag in tags"
          :to="`/${tag}`"
          class="tag-pill tag-default ng-binding ng-scope"
        >
          {{ tag }}
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useTags } from "@/composable/useTags";

const { tags, isLoading } = useTags();
</script>
