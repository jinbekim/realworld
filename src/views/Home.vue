<script setup lang="ts">
import { Get } from "@/dependency";
import { isError } from "@/libs/isError";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { Article } from "@/domain/Article";
import RealPostTile from "@/components/RealPostTile.vue";
import { isArray } from "@vue/shared";
import useUser from "@/hooks/useUser";

const route = useRoute();
const user = useUser();
const filter = ref(
  isArray(route.params.tag)
    ? route.params.tag[0]
    : route.params.tag || user.value
    ? "Your Feed"
    : "Global Feed"
);

const tags = reactive({
  tagList: [] as string[],
  loading: true,
});
const feed = reactive({
  feedList: [] as Article[],
  loading: true,
});

onMounted(async () => {
  Get.get("ITagRepository")
    .getAll()
    .then((result) => {
      if (!isError(result)) {
        tags.tagList = result;
        tags.loading = false;
      }
    });
});
watch(
  () => route.params.tag,
  () => {
    console.log(user.value);
    filter.value = isArray(route.params.tag)
      ? route.params.tag[0]
      : route.params.tag || user
      ? "Your Feed"
      : "Global Feed";

    console.log("ww");
  }
);
watch(
  filter,
  () => {
    feed.loading = true;
    console.log("hi", filter.value);
    if (filter.value === "Your Feed") {
      Get.get("IArticleRepository")
        .getFeedArticles({ limit: 10, offset: 0 })
        .then((result) => {
          if (!isError(result)) {
            feed.feedList = result.articles;
            feed.loading = false;
          }
        });
    } else if (filter.value === "Global Feed") {
      Get.get("IArticleRepository")
        .getArticles({ pagination: { limit: 10, offset: 0 } })
        .then((result) => {
          if (!isError(result)) {
            feed.feedList = result.articles;
            feed.loading = false;
          }
        });
    } else if (filter.value) {
      Get.get("IArticleRepository")
        .getArticles({
          pagination: { limit: 10, offset: 0 },
          tag: filter.value,
        })
        .then((result) => {
          if (!isError(result)) {
            feed.feedList = result.articles;
            feed.loading = false;
          }
        });
    } else {
      feed.loading = false;
    }
  },
  {
    immediate: true,
  }
);

function onSelectTab(event: Event) {
  const tab = (event.target as HTMLButtonElement).innerText;
  if (tab[0] === "#") {
    filter.value = tab.slice(1).trim();
  } else {
    filter.value = tab;
  }
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
            <ul class="nav nav-pills outline-active" @click="onSelectTab">
              <li class="nav-item" v-if="user">
                <button
                  type="button"
                  class="nav-link"
                  :class="{ active: `Your Feed` === filter }"
                >
                  Your Feed
                </button>
              </li>
              <li class="nav-item">
                <button
                  type="button"
                  class="nav-link"
                  :class="{ active: `Global Feed` === filter }"
                >
                  Global Feed
                </button>
              </li>
              <li class="nav-item" v-if="$route.params.tag">
                <button
                  type="button"
                  class="nav-link"
                  :class="{ active: $route.params.tag === filter }"
                >
                  # {{ $route.params.tag }}
                </button>
              </li>
            </ul>
          </div>
          <RealPostTile
            v-if="feed && !feed.loading"
            v-for="item in feed.feedList"
            :item="item"
          ></RealPostTile>
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <span v-if="tags.loading">Loading...</span>
            <div v-else class="tag-list">
              <router-link
                v-for="tag in tags.tagList"
                :to="'/tags/' + tag"
                class="tag-pill tag-default"
              >
                <li style="list-style: none">
                  {{ tag }}
                </li>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
