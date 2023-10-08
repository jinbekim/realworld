<route lang="json">
{
  "props": true
}
</route>
<script setup lang="ts">
import { useProfile } from '@/entities/profile';
import { useSessionStore } from '@/entities/session';
interface Props {
  id: string;
}
const props = defineProps<Props>();
const { data: profile, isLoading } = useProfile(props.id);
import { FollowButton } from '@/features/profile/follow/follow-profile';
import { UnfollowButton } from '@/features/profile/follow/unfollow-profile';
import { computed } from 'vue';

const { useAuth, currentUser } = useSessionStore();
const isAuth = computed(() => useAuth());
const isGuest = computed(() => !useAuth());
const isUser = computed(
  () => isAuth.value && currentUser?.username !== props.id
);
const isCurrentUser = computed(
  () => isAuth.value && currentUser?.username === props.id
);

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
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container" v-if="profile">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <template v-if="isCurrentUser">
              <FollowButton
                v-if="!profile.following"
                :user="profile"
              ></FollowButton>
              <UnfollowButton v-else :user="profile"> </UnfollowButton>
            </template>
          </div>
        </div>
      </div>
    </div>

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

        </div>
      </div>
    </div> -->
  </div>
</template>
