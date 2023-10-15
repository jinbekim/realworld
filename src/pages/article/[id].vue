<route lang="json">
{
  "props": true
}
</route>
<template>
  <div class="article-page" v-if="data">
    <div class="banner">
      <div class="container">
        <h1>{{ data.title }}</h1>

        <template v-if="isCurrentUser">
          <CurrentUserArticleMeta :article="data"></CurrentUserArticleMeta>
        </template>
        <template v-else-if="isGuest">
          <GuestArticleMeta :article="data"></GuestArticleMeta>
        </template>
        <template v-else-if="isUser">
          <UserArticleMeta :article="data"></UserArticleMeta>
        </template>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ data.description }}
          </p>
          <h2 id="introducing-ionic">{{ data.title }}</h2>
          <p v-html="data.body"></p>
          <ul class="tag-list">
            <li
              v-for="tag in data.tagList"
              :key="tag"
              class="tag-default tag-pill tag-outline"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <template v-if="isCurrentUser">
          <CurrentUserArticleMeta :article="data"></CurrentUserArticleMeta>
        </template>
        <template v-else-if="isGuest">
          <GuestArticleMeta :article="data"></GuestArticleMeta>
        </template>
        <template v-else-if="isUser">
          <UserArticleMeta :article="data"></UserArticleMeta>
        </template>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <NewCommentEditor :slug="id"></NewCommentEditor>
          <CommentList :slug="id"></CommentList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticle } from '@/entities/article';
import { useSessionStore } from '@/entities/session';
import { computed, toRef } from 'vue';
import { vLoading } from '@/shared/directives';
import {
  UserArticleMeta,
  CurrentUserArticleMeta,
  GuestArticleMeta,
} from '@/widgets/article-meta';
import { NewCommentEditor } from '@/widgets/new-comment-editor';
import { CommentList } from '@/widgets/comment-list';

interface Props {
  id: UniqueId;
}
const props = defineProps<Props>();

const { data, isLoading } = useArticle(props.id);
const author = toRef(() => data.value?.author);

const { useAuth, currentUser } = useSessionStore();
const isAuth = computed(() => useAuth());
const isGuest = computed(() => !useAuth());
const isUser = computed(
  () => isAuth.value && currentUser?.username !== author.value?.username
);
const isCurrentUser = computed(
  () => isAuth.value && currentUser?.username === author.value?.username
);
</script>

<style scoped></style>
