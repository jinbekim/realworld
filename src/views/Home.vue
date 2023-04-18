<script setup lang="ts">
import { Get } from "@/dependency";
import { isError } from "@/libs/isError";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import type { Article } from "@/domain/Article";
import RealPostTile from "@/components/RealPostTile.vue";
import useUser from "@/hooks/useUser";
import RealPagination from "@/components/RealPagination.vue";
import RealArticles from "@/components/RealArticles.vue";

const user = useUser();
const filter = ref<string>(user ? "Your Feed" : "Global Feed");

onMounted(() => {
  Get.get("ITagRepository")
    .getAll()
    .then((result) => {
      if (!isError(result)) {
        tags.tagList = result;
        tags.loading = false;
      }
    });
});

const tags = reactive({
  tagList: [] as string[],
  loading: true,
});
const feed = reactive({
  feedList: [] as Article[],
  loading: true,
});

const pagination = reactive({
  total: 0,
  limit: 10,
  offset: 0,
});

watchEffect(() => {
  feed.loading = true;

  if (filter.value === "Your Feed") {
    Get.get("IArticleRepository")
      .getFeedArticles({ limit: pagination.limit, offset: pagination.offset })
      .then((result) => {
        if (!isError(result)) {
          feed.feedList = result.articles;
          feed.loading = false;
          pagination.total = result.articlesCount;
        }
      });
  } else {
    Get.get("IArticleRepository")
      .getArticles({
        tag: filter.value === "Global Feed" ? undefined : filter.value,
        pagination: {
          limit: pagination.limit,
          offset: pagination.offset,
        },
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

function onSelectTab(event: Event) {
  const tab = (event.target as HTMLButtonElement).innerText;
  if (tab[0] === "#") {
    filter.value = tab.slice(1).trim();
  } else if (tab === "Your Feed" || tab === "Global Feed") {
    filter.value = tab;
  }
  pagination.offset = 0;
}

function onClickPage(page: number) {
  pagination.offset = page * pagination.limit;
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
              <li
                class="nav-item"
                v-if="
                  filter && filter !== 'Your Feed' && filter !== 'Global Feed'
                "
              >
                <button type="button" class="nav-link active">
                  # {{ filter }}
                </button>
              </li>
            </ul>
          </div>

          <RealArticles
            :isLoading="feed.loading"
            :items="feed.feedList"
          ></RealArticles>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <span v-if="tags.loading">Loading...</span>
            <div v-else class="tag-list">
              <router-link
                to="/"
                v-for="tag in tags.tagList"
                @click="
                  () => {
                    filter = tag;
                  }
                "
                class="tag-pill tag-default ng-binding ng-scope"
              >
                {{ tag }}
              </router-link>
            </div>
          </div>
        </div>

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
