<template>
  <ArticleMeta :article="article">
    <template #actionSlot>
      <UnfollowButton v-if="article.author.following" :user="article.author" />
      <FollowButton v-else :user="article.author" />
      &nbsp;
      <FavoriteButton v-if="!article.favorited" :article="article" />
      <UnfavoriteButton v-else :article="article" />
    </template>
  </ArticleMeta>
</template>

<script setup lang="ts">
import { UnfollowButton } from '@/features/profile/follow/unfollow-profile';
import { FollowButton } from '@/features/profile/follow/follow-profile';
import { FavoriteButton, UnfavoriteButton } from '@/features/article/favorite';
import { ArticleMeta, type Article } from '@/entities/article';

interface Props {
  article: Article;
}

defineProps<Props>();
</script>

<style scoped></style>
