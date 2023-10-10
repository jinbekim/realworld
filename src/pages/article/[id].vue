<route lang="json">
  {
    "props": true
  }
</route>
<template>
  <div class="article-page" v-if="data">
    <div class="banner">
      <div class="container">
        <h1>{{ data?.title }}</h1>

        <ArticleMeta v-loading="isLoading" :article="data">
          <template #actionSlot>
            <template v-if="isCurrentUser">
              <CurrentUserArticleMeta :slug="data.slug"></CurrentUserArticleMeta>
            </template>
            <template v-else-if="isGuest">
              <GuestArticleMeta :article="data"></GuestArticleMeta>
            </template>
            <template v-else-if="isUser">
              <UserArticleMeta :article="data"></UserArticleMeta>
            </template>
        </template>
      </ArticleMeta>
      </div>
    </div>

    <!-- <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ article?.description }}
          </p>
          <h2 id="introducing-ionic">{{ article?.title }}</h2>
          <p v-html="article.body"></p>
        </div>
      </div>

      <hr /> -->

      <!-- <div class="article-actions">
        <div class="article-meta">
          <real-mini-profile :item="article"> </real-mini-profile>

          <template v-if="isPostMine">
            <real-edit-article-button :slug="slug" />
            &nbsp;
            <real-delete-article-button :slug="slug" />
          </template>
          <template v-else>
            <real-follow-button :user="article.author" />
            &nbsp;
            <real-favorite-button :item="article" full />
          </template>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <real-comment :slug="slug"></real-comment>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import {useArticle, ArticleMeta} from '@/entities/article';
import { useSessionStore } from '@/entities/session';
import { computed, watchEffect } from 'vue';
import { vLoading } from '@/shared/directives';
import {UserArticleMeta, CurrentUserArticleMeta, GuestArticleMeta} from '@/widgets/article-meta';

  interface Props {
    id: UniqueId
  }
  const props =defineProps<Props>();

  const { data, isLoading } = useArticle(props.id);
  watchEffect(() => console.log(data.value));

  const { useAuth, currentUser } = useSessionStore();
const isAuth = computed(() => useAuth());
const isGuest = computed(() => !useAuth());
const isUser = computed(
  () => isAuth.value && currentUser?.username !== props.id
);
const isCurrentUser = computed(
  () => isAuth.value && currentUser?.username === props.id
);


</script>

<style scoped>

</style>
