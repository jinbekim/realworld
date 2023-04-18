<script setup lang="ts">
import { Get } from "@/dependency";
import type { Article } from "@/domain/Article";
import type { Profile } from "@/domain/Profile";
import useUser from "@/hooks/useUser";
import { isError } from "@/libs/isError";
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRef,
  watch,
  watchEffect,
} from "vue";
import { useRouter } from "vue-router";
import RealFollowButton from "@/components/buttons/RealFollowButton.vue";
import RealEditProfileButton from "@/components/buttons/RealEditProfileButton.vue";
import RealPagination from "@/components/RealPagination.vue";
const router = useRouter();
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
console.log(router.currentRoute.value.name);
const username = toRef(props, "username");
const user = ref<Profile>();
const currentUser = useUser();
const items = ref<Article[]>([]);
const isMine = computed(() => {
  if (!user.value) return false;
  return user.value.username === currentUser.value?.username;
});
const isLoading = ref(false);

const pagination = reactive({
  total: 0,
  limit: 10,
  offset: 0,
});

watchEffect(() => {
  isLoading.value = true;
  if (username.value) {
    getUserProfile(username.value).then((res) => {
      if (!isError(res)) return (user.value = res);
      router.replace("/login");
      return {} as Profile;
    });
  }
  getArticles(username.value).then((res) => {
    isLoading.value = false;
    if (!isError(res)) return (items.value = res);
    router.replace("/login");
    return [] as Article[];
  });
});

watch(
  () => router.currentRoute.value.name,
  async (val) => {
    console.log("watched ");
    isLoading.value = true;
    if (val === "profile-articles") {
      items.value = await getArticles(username.value);
      console.log(items.value);
    } else if (val === "profile-favorites") {
      items.value = await getFavorites(username.value);
    }
    isLoading.value = false;
  }
);

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

async function getUserProfile(username: string): Promise<Profile> {
  const profileRepository = Get.get("IProfileRepository");
  const ret = await profileRepository.getProfile(username);
  if (!isError(ret)) return ret;
  router.replace("/login");
  return {} as Profile;
}

function onClickPage(page: number) {
  pagination.offset = page * pagination.limit;
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
            <real-edit-profile-button v-if="isMine"></real-edit-profile-button>
            <real-follow-button v-else :user="user"></real-follow-button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="`/@${username}`"
                  class="nav-link"
                  :class="{ active: $route.name === 'profile-articles' }"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="`/@${username}/favorites`"
                  class="nav-link"
                  :class="{ active: $route.name === 'profile-favorites' }"
                >
                  Favorited Articles
                </router-link>
              </li>
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
