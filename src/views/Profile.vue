<script setup lang="ts">
import { Get } from "@/dependency";
import type { Article } from "@/domain/Article";
import type { Profile } from "@/domain/Profile";
import useUser from "@/hooks/useUser";
import { isError } from "@/libs/isError";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import RealFollowButton from "@/components/buttons/RealFollowButton.vue";
const router = useRouter();
const { username } = defineProps({
  username: {
    type: String,
    required: true,
  },
});
const user = ref<Profile>();
const currentUser = useUser();

const items = ref<Article[]>([]);

onMounted(async () => {
  const profileRepository = Get.get("IProfileRepository");
  if (username) {
    const tmp = await profileRepository.getProfile(username);
    if (!isError(tmp)) {
      user.value = tmp;
    }
  }

  getMyArticles();
});

const selectedTab = ref("My Articles");
const isLoading = ref(false);
function selectTab(event: Event) {
  const tab = (event.target as HTMLButtonElement).innerText;
  selectedTab.value = tab;
}

watch(selectedTab, async (val) => {
  console.log("watched ");
  isLoading.value = true;
  if (val === "My Articles") {
    items.value = await getMyArticles();
    console.log(items.value);
  } else if (val === "Favorited Articles") {
    items.value = await getMyFavorites();
  }
  isLoading.value = false;
});

async function getMyArticles(): Promise<Article[]> {
  const articleRepository = Get.get("IArticleRepository");
  const ret = await articleRepository.getArticles({
    author: currentUser.value?.username,
    pagination: { limit: 5, offset: 0 },
  });
  if (!isError(ret)) return ret.articles;
  router.replace("/login");
  return [];
}

async function getMyFavorites(): Promise<Article[]> {
  const articleRepository = Get.get("IArticleRepository");
  const ret = await articleRepository.getArticles({
    favorited: currentUser.value?.username,
    pagination: { limit: 5, offset: 0 },
  });
  if (!isError(ret)) return ret.articles;
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
            <real-follow-button :user="user"></real-follow-button>
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
                <button
                  @click="selectTab"
                  class="nav-link"
                  :class="{ active: selectedTab === 'My Articles' }"
                >
                  My Articles
                </button>
              </li>
              <li class="nav-item">
                <button
                  @click="selectTab"
                  class="nav-link"
                  :class="{ active: selectedTab === 'Favorited Articles' }"
                >
                  Favorited Articles
                </button>
              </li>
            </ul>
          </div>

          <div v-if="isLoading" class="article-preview">
            <h1>Loading...</h1>
            <p>Loading...</p>
          </div>
          <div
            v-else-if="items.length"
            v-for="item in items"
            class="article-preview"
          >
            <div class="article-meta">
              <router-link :to="`/@${item.author}`"
                ><img :src="item.author.image"
              /></router-link>
              <div class="info">
                <router-link :to="`/@${item.author}`" class="author">{{
                  item.author.username
                }}</router-link>
                <span class="date">{{ item.createdAt }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: item.favorited }"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <router-link :to="`/articles/${item.slug}`" class="preview-link">
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
            </router-link>
          </div>
          <div v-else>
            <p>No articles are here... yet.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
