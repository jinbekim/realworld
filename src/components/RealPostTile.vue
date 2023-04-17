<template>
  <div class="article-preview">
    <div class="article-meta">
      <real-mini-profile :item="item"></real-mini-profile>
      <real-favorite-button :item="item"></real-favorite-button>
    </div>
    <router-link :to="`/articles/${item.slug}`" class="preview-link">
      <h1>{{ item.title }}</h1>
      <p>{{ item.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in item.tagList"
          class="tag-default tag-pill tag-outline ng-binding ng-scope"
        >
          {{ tag }}
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { Article } from "@/domain/Article";
import RealMiniProfile from "./RealMiniProfile.vue";
import RealFavoriteButton from "./buttons/RealFavoriteButton.vue";
import { toRef } from "vue";

const props = defineProps<{
  item: Article;
}>();

const item = toRef(props, "item");
</script>
