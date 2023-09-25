<route lang="json">
  {
    "props": true
  }
</route>
<script setup lang="ts">

import { ref, toRef, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router/auto';
import RealEditProfileButton from '@/components/buttons/RealEditProfileButton.vue';
import RealPagination from '@/components/RealPagination.vue';
import { usePagination } from '@/composable/usePagination';

interface Props {
  id: string;
}
const props = defineProps<Props>();
console.log(props.id);
// import RealNavTab from '@/components/RealNavTab.vue';
// import FollowButton from '@/features/profile/follow/follow-profile';


// const { user } = useUser();
// const { profile } = useProfile(props.username);

// const items = ref<Article[]>([]);
// const isMine = (username?: string) => {
//   return profile.value?.username === username;
// };
// const isLoading = ref(false);
// const { pagination, onClickPage } = usePagination();

// watchEffect(async () => {
//   console.log("watched ");
//   isLoading.value = true;
//   if (route.name === "profile-articles") {
//     items.value = await getArticles(props.username);
//     console.log(items.value);
//   } else if (route.name === "profile-favorites") {
//     items.value = await getFavorites(props.username);
//   }
//   isLoading.value = false;
// });

// async function getArticles(username: string, options: RequestInit = {}): Promise<Article[]> {
//   const articleRepository = Get.get("IArticleRepository");
//   const ret = await articleRepository.getArticles({
//     author: username,
//     pagination: { limit: pagination.limit, offset: pagination.offset },
//   });

//   if (!isError(ret)) {
//     pagination.total = ret.articlesCount;
//     return ret.articles;
//   }
//   router.replace("/login");
//   return [];
// }

// async function getFavorites(username: string, options: RequestInit = {}): Promise<Article[]> {
//   const articleRepository = Get.get("IArticleRepository");
//   const ret = await articleRepository.getArticles({
//     favorited: username,
//     pagination: { limit: pagination.limit, offset: pagination.offset },
//   });
//   if (!isError(ret)) {
//     pagination.total = ret.articlesCount;
//     return ret.articles;
//   }
//   router.replace("/login");
//   return [];
// }
</script>

<template>
  <div class="profile-page">
    <!-- <div class="user-info">
      <div class="container" v-if="profile">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <FollowButton
              v-if="isMine(user?.username)"
            ></FollowButton>
            <real-follow-button v-else :user="profile!"></real-follow-button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="container">
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
    </div> -->
  </div>
</template>
