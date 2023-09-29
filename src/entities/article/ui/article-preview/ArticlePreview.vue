<template>
  <div class="article-preview">
    <div class="article-meta">
      <RouterLink :to="`/@${article.author.username}`"
        ><img :src="article.author.image"
      /></RouterLink>
      <div class="info">
        <RouterLink :to="`/@${article.author.username}`" class="author">{{
          article.author.username
        }}</RouterLink>
        <span class="date">{{ article.createdAt }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <RouterLink :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="tag of article.tagList"
        >
          {{ tag }}
        </li>
      </ul>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '../../api/Article';

interface Props {
  article: Article;
}

defineProps<Props>();
</script>

<style scoped></style>
