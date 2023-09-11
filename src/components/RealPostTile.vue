<template>
  <div class="article-preview">
    <div class="article-meta">
      <real-mini-profile :item="props.item"></real-mini-profile>
      <real-favorite-button :item="props.item"></real-favorite-button>
    </div>
    <router-link :to="`/articles/${props.item.slug}`" class="preview-link">
      <h1>{{ props.item.title }}</h1>
      <p>{{ props.item.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in props.item.tagList"
          class="tag-default tag-pill tag-outline ng-binding ng-scope"
        >
          {{ tag }}
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { Article } from "@/entities/article/Article";
import RealMiniProfile from "./RealMiniProfile.vue";
import RealFavoriteButton from "./buttons/RealFavoriteButton.vue";

const props = defineProps<{
  item: Article;
}>();
</script>
