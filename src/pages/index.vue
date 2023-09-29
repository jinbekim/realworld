<route lang="json">
{
  "name": "home",
  "props": true
}
</route>
<script setup lang="ts">
import { useSessionStore } from '@/entities/session/model/sessionModel';
import { type Tag } from '@/entities/tag';
import { usePagination } from '@/shared/composables/usePagination';
import { PopularTags } from '@/widgets/popular-tags';

interface Props {
  tag: Tag;
}
defineProps<Props>();

const { useAuth } = useSessionStore();
const { pagination, onClickPage } = usePagination();
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
              <li class="nav-item" v-if="useAuth()">
                <RouterLink
                  to="/user-feed"
                  class="nav-link"
                  exact-active-class="active"
                >
                  Your Feed
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/" class="nav-link" exact-active-class="active">
                  Global Feed
                </RouterLink>
              </li>
              <li v-if="tag" class="nav-item">
                <RouterLink :to="''" class="nav-link active">
                  # {{ tag }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <RouterView></RouterView>
        </div>

        <PopularTags></PopularTags>

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
