<route lang="json">
{
  "props": true
}
</route>

<template>
  <div class="profile-page">
    <ProfileCard :username="username"></ProfileCard>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: tab === 'author' }"
                  @click="handleAuthorClick"
                >
                  My Articles
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: tab === 'favorite' }"
                  @click="handleFavoriteClick"
                >
                  Favorited Articles
                </button>
              </li>
            </ul>
          </div>

          <template v-if="tab === 'author'">
            <GlobalArticleList :author="username" :limit="10" :offset="0" />
          </template>
          <template v-else-if="tab === 'favorite'">
            <GlobalArticleList :favorited="username" :limit="10" :offset="0" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/entities/session';
import { computed, ref } from 'vue';
import { ProfileCard } from '@/widgets/profile-card';
import { GlobalArticleList } from '@/widgets/global-article-list';

interface Props {
  username: string;
}
defineProps<Props>();

const tab = ref<'author' | 'favorite'>('favorite');
const handleAuthorClick = () => (tab.value = 'author');
const handleFavoriteClick = () => (tab.value = 'favorite');
</script>
