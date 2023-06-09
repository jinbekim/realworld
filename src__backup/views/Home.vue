<script setup lang="ts">
import { Get } from "@/dependency";
import { isError } from "@/libs/isError";
import { defineAsyncComponent, reactive, ref, watchEffect } from "vue";
import type { Article } from "@/domain/Article";
import RealPagination from "@/components/RealPagination.vue";
import useUser from "@/store/useUser";

import { usePagination } from "@/composable/usePagination";
import { useRoute } from "vue-router";
import { isArray } from "@vue/shared";
import RealNavTab from "@/components/RealNavTab.vue";
import MiddleComponent from "@/components/buttons/MiddleComponent.vue";
import Wrapper from "@/components/layouts/Wrapper.vue";

const TheAside = defineAsyncComponent({
  loader: () => import("@/components/layouts/Wrapper.vue"),
});

const route = useRoute();
const { user } = useUser();
const { pagination, onClickPage } = usePagination();
const filter = ref<string>();
const feed = reactive({
  feedList: [] as Article[],
  loading: true,
});

watchEffect(() => {
  filter.value = isArray(route.params.tag)
    ? route.params.tag[0]
    : route.params.tag;
});

watchEffect(() => {
  feed.loading = true;

  //REVIEW -  router-view로 나눴어도 될듯.
  if (route.name === "my-feed") {
    if (!user.value) throw new Error("User is not logged in");
    Get.get("IArticleRepository")
      .getFeedArticles({ limit: pagination.limit, offset: pagination.offset })
      .then((result) => {
        if (!isError(result)) {
          feed.feedList = result.articles;
          feed.loading = false;
          pagination.total = result.articlesCount;
        }
      });
  } else if (route.name === "global-feed") {
    Get.get("IArticleRepository")
      .getArticles({ pagination })
      .then((result) => {
        if (!isError(result)) {
          feed.feedList = result.articles;
          feed.loading = false;
          pagination.total = result.articlesCount;
        }
      });
  } else if (route.name === "tag-feed") {
    Get.get("IArticleRepository")
      .getArticles({
        tag: isArray(route.params.tag) ? route.params.tag[0] : route.params.tag,
        pagination,
      })
      .then((result) => {
        if (!isError(result)) {
          feed.feedList = result.articles;
          feed.loading = false;
          pagination.total = result.articlesCount;
        }
      });
  }
});

function onClick() {
  console.log("button click from parent");
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
              <MiddleComponent @click="onClick"></MiddleComponent>
              <RealNavTab
                v-if="user"
                to="/my-feed"
                :active="$route.name === 'my-feed'"
              >
                Your Feed
              </RealNavTab>
              <RealNavTab to="/" :active="$route.name === 'global-feed'">
                Global Feed
              </RealNavTab>
              <RealNavTab
                v-if="$route.name === 'tag-feed'"
                :to="`/tags/${filter}`"
                :active="$route.name === 'tag-feed'"
              >
                # {{ filter }}
              </RealNavTab>
            </ul>
          </div>

          <!-- REVIEW - type checking?  -->
          <RealArticles
            :isLoading="feed.loading"
            :items="feed.feedList"
          ></RealArticles>
          <!-- <router-view :isLoading="feed.loading" :items="feed.feedList" /> -->
        </div>

        <TheAside></TheAside>

        <RealPagination
          v-if="!feed.loading"
          :total="pagination.total"
          :limit="pagination.limit"
          :offset="pagination.offset"
          :onClickPage="onClickPage"
        ></RealPagination>
      </div>
    </div>
  </div>
</template>
