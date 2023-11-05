<route lang="json">
{
  "name": "home"
}
</route>
<script setup lang="ts">
import { useSessionStore } from '@/entities/session';
import { usePagination } from '@/shared/composables/usePagination';
import { PopularTags } from '@/widgets/popular-tags';
import { ref } from 'vue';
import { GlobalArticleList } from '@/widgets/global-article-list';
import { UserArticleList } from '@/widgets/user-article-list';

const { useAuth } = useSessionStore();
const { pagination, onClickPage } = usePagination();

const tab = ref(useAuth() ? 'Your Feed' : 'Global Feed');
const handleClickTabs = {
  yourFeed: () => (tab.value = 'Your Feed'),
  globalFeed: () => (tab.value = 'Global Feed'),
  tag: (tag: string) => (tab.value = tag),
};
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
              <li v-if="useAuth()" class="nav-item" @click="">
                <button
                  class="nav-link"
                  :class="{ active: tab === 'Your Feed' }"
                  @click="handleClickTabs.yourFeed"
                >
                  Your Feed
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: tab === 'Global Feed' }"
                  @click="handleClickTabs.globalFeed"
                >
                  Global Feed
                </button>
              </li>
              <li
                v-if="tab !== 'Your Feed' && tab !== 'Global Feed'"
                class="nav-item active"
              >
                <button class="nav-link active">{{ `# ${tab}` }}</button>
              </li>
            </ul>
          </div>

          <template v-if="tab === 'Your Feed'">
            <UserArticleList :offset="0" :limit="20"></UserArticleList>
          </template>
          <template v-else-if="tab === 'Global Feed'"
            ><GlobalArticleList :offset="0" :limit="20"></GlobalArticleList>
          </template>
          <template v-else
            ><GlobalArticleList
              :offset="0"
              :limit="20"
              :tag="tab"
            ></GlobalArticleList>
          </template>
        </div>

        <PopularTags @click="handleClickTabs.tag"></PopularTags>
      </div>
    </div>
  </div>
</template>
