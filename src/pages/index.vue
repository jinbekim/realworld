<route lang="json">
{
  "name": "home"
}
</route>
<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, watchEffect } from 'vue';
import RealPagination from '@/components/RealPagination.vue';
import { usePagination } from '@/composable/usePagination';
import NavTab from '@/components/NavTab.vue';
import { useSessionStore } from '@/entities/session/model/sessionModel';

const TheAside = defineAsyncComponent({
  loader: () => import('@/components/layouts/Wrapper.vue'),
});

const { isAuth } = useSessionStore();
const { pagination, onClickPage } = usePagination();
const filter = ref<string>();
const activeTab = ref<{ [key: string]: boolean }>(
  isAuth ? { userFeed: true } : { globalFeed: true }
);

watchEffect(() => {
  //REVIEW -  router-view로 나눴어도 될듯.
  // if (route.name === 'my-feed') {
  //   if (currentUser) throw new Error('User is not logged in');
  //   Get.get('IArticleRepository')
  //     .getFeedArticles({ limit: pagination.limit, offset: pagination.offset })
  //     .then((result) => {
  //       if (!isError(result)) {
  //         feed.feedList = result.articles;
  //         feed.loading = false;
  //         pagination.total = result.articlesCount;
  //       }
  //     });
  // } else if (route.name === 'global-feed') {
  //   Get.get('IArticleRepository')
  //     .getArticles({ pagination })
  //     .then((result) => {
  //       if (!isError(result)) {
  //         feed.feedList = result.articles;
  //         feed.loading = false;
  //         pagination.total = result.articlesCount;
  //       }
  //     });
  // } else if (route.name === 'tag-feed') {
  //   Get.get('IArticleRepository')
  //     .getArticles({
  //       tag: isArray(route.params.tag) ? route.params.tag[0] : route.params.tag,
  //       pagination,
  //     })
  //     .then((result) => {
  //       if (!isError(result)) {
  //         feed.feedList = result.articles;
  //         feed.loading = false;
  //         pagination.total = result.articlesCount;
  //       }
  //     });
  // }
});

function onClick() {
  console.log('button click from parent');
}
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li
                class="nav-item"
                v-if="isAuth"
                @click="activeTab = { userFeed: true }"
              >
                <RouterLink
                  to="/"
                  class="nav-link"
                  :class="{ active: activeTab.userFeed }"
                >
                  Your Feed
                </RouterLink>
              </li>
              <li class="nav-item" @click="activeTab = { globalFeed: true }">
                <RouterLink
                  to="/"
                  class="nav-link"
                  :class="{ active: activeTab.globalFeed }"
                >
                  Global Feed
                </RouterLink>
              </li>
              <li
                v-if="activeTab.tagFeed"
                @click="activeTab = { tagFeed: true }"
              >
                <RouterLink
                  disabled
                  :to="`/tags/${filter}`"
                  class="nav-link active"
                >
                  # {{ filter }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <RealArticles></RealArticles>
        </div>

        <TheAside></TheAside>

        <RealPagination
          :total="pagination.total"
          :limit="pagination.limit"
          :offset="pagination.offset"
          :onClickPage="onClickPage"
        ></RealPagination>
      </div>
    </div>
  </div>
</template>
