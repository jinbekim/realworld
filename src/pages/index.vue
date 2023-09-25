<route lang="json">
{
  "name": "home",
  "props": true
}
</route>
<script setup lang="ts">
import RealPagination from '@/components/RealPagination.vue';
import { usePagination } from '@/composable/usePagination';
import { useSessionStore } from '@/entities/session/model/sessionModel';
import TheAside from '@/components/layouts/TheAside.vue'
import { useTags, type Tag } from '@/entities/tag';

interface Props {
  tag: Tag
}
defineProps<Props>();

const { isAuth } = useSessionStore();
const { pagination, onClickPage } = usePagination();
const {data:tags} =useTags();

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
              >
                <RouterLink
                  to="/my-feed"
                  class="nav-link"
                  exactActiveClass="active"
                >
                  Your Feed
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  to="/"
                  class="nav-link"
                  exactActiveClass="active"
                >
                  Global Feed
                </RouterLink>
              </li>
              <li
                v-if="tag"
                class="nav-item"
              >
                <RouterLink
                  :to="''"
                  class="nav-link active"
                >
                  # {{ tag }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <RouterView></RouterView>
        </div>

        <TheAside :tags="tags"></TheAside>

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
