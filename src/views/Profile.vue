<script setup lang="ts">
import { Get } from "@/dependency";
import type { Article } from "@/domain/Article";
import { isError } from "@/libs/isError";
import { ref, toRef, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import RealFollowButton from "@/components/buttons/RealFollowButton.vue";
import RealEditProfileButton from "@/components/buttons/RealEditProfileButton.vue";
import RealPagination from "@/components/RealPagination.vue";
import { usePagination } from "@/composable/usePagination";
import { useProfile } from "@/composable/useProfile";
import useUser from "@/store/useUser";
import RealNavTab from "@/components/RealNavTab.vue";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const { user } = useUser();
const { profile } = useProfile(props.username);

const items = ref<Article[]>([]);
const isMine = (username: string) => {
  return profile.value?.username === username;
};
const isLoading = ref(false);
const { pagination, onClickPage } = usePagination();

watchEffect(async () => {
  console.log("watched ");
  isLoading.value = true;
  if (route.name === "profile-articles") {
    items.value = await getArticles(props.username);
    console.log(items.value);
  } else if (route.name === "profile-favorites") {
    items.value = await getFavorites(props.username);
  }
  isLoading.value = false;
});

async function getArticles(username: string): Promise<Article[]> {
  const articleRepository = Get.get("IArticleRepository");
  const ret = await articleRepository.getArticles({
    author: username,
    pagination: { limit: pagination.limit, offset: pagination.offset },
  });

  if (!isError(ret)) {
    pagination.total = ret.articlesCount;
    return ret.articles;
  }
  router.replace("/login");
  return [];
}

async function getFavorites(username: string): Promise<Article[]> {
  const articleRepository = Get.get("IArticleRepository");
  const ret = await articleRepository.getArticles({
    favorited: username,
    pagination: { limit: pagination.limit, offset: pagination.offset },
  });
  if (!isError(ret)) {
    pagination.total = ret.articlesCount;
    return ret.articles;
  }
  router.replace("/login");
  return [];
}
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container" v-if="user">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <real-edit-profile-button
              v-if="isMine(user.username)"
            ></real-edit-profile-button>
            <real-follow-button v-else :user="profile!"></real-follow-button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <RealNavTab
                :to="`/@${username}`"
                :active="$route.name === 'profile-articles'"
              >
                Favorited Articles
              </RealNavTab>
              <RealNavTab
                :to="`/@${username}/favorites`"
                :active="$route.name === 'profile-favorites'"
              >
                Favorited Articles
              </RealNavTab>
            </ul>
          </div>

          <RouterView :isLoading="isLoading" :items="items"></RouterView>

          <RealPagination
            :total="pagination.total"
            :limit="pagination.limit"
            :offset="pagination.offset"
            :onClickPage="onClickPage"
          ></RealPagination>
        </div>
      </div>
    </div>
  </div>
</template>
