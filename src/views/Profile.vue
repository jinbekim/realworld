<script setup lang="ts">
import { Get } from "@/dependency";
import type { Article } from "@/domain/Article";
import type { Profile } from "@/domain/Profile";
import useUser from "@/hooks/useUser";
import { isError } from "@/libs/isError";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useRouter } from "vue-router";
import RealFollowButton from "@/components/buttons/RealFollowButton.vue";
import RealPostTile from "@/components/RealPostTile.vue";
import RealEditProfileButton from "@/components/buttons/RealEditProfileButton.vue";
const router = useRouter();
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
const username = toRef(props, "username");
const user = ref<Profile>();
const currentUser = useUser();
const items = ref<Article[]>([]);
const isMine = computed(() => {
  if (!user.value) return false;
  return user.value.username === currentUser.value?.username;
});

onMounted(async () => {
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

const selectedTab = ref("My Articles");
const isLoading = ref(false);
function selectTab(event: Event) {
  const tab = (event.target as HTMLButtonElement).innerText;
  selectedTab.value = tab;
}

watch(
  () => router.currentRoute.value.path,
  async () => {
    // console.log("watch user change");
    user.value = await getUserProfile(
      router.currentRoute.value.path.split("@")[1]
    );
  }
);

watch(selectedTab, async (val) => {
  console.log("watched ");
  isLoading.value = true;
  if (val === "My Articles") {
    items.value = await getArticles(username.value);
    console.log(items.value);
  } else if (val === "Favorited Articles") {
    items.value = await getFavorites(username.value);
  }
  isLoading.value = false;
});

async function getArticles(username: string): Promise<Article[]> {
  const articleRepository = Get.get("IArticleRepository");
  const ret = await articleRepository.getArticles({
    author: username,
    pagination: { limit: 5, offset: 0 },
  });

  if (!isError(ret)) return ret.articles;
  router.replace("/login");
  return [];
}

async function getFavorites(username: string): Promise<Article[]> {
  const articleRepository = Get.get("IArticleRepository");
  const ret = await articleRepository.getArticles({
    favorited: username,
    pagination: { limit: 5, offset: 0 },
  });
  if (!isError(ret)) return ret.articles;
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
          <template v-else-if="items.length">
            <real-post-tile v-for="item in items" :item="item" />
          </template>
          <div v-else>
            <p>No articles are here... yet.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
