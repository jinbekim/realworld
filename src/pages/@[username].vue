<route lang="json">
{
  "props": true
}
</route>

<template>
  <div class="profile-page">
    <ProfileCard :username="username"></ProfileCard>

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

<script setup lang="ts">
import { useSessionStore } from '@/entities/session';
import { computed } from 'vue';
import { ProfileCard } from '@/widgets/profile-card';

interface Props {
  username: string;
}
const props = defineProps<Props>();

const { useAuth, currentUser } = useSessionStore();
const isAuth = computed(() => useAuth());
const isGuest = computed(() => !useAuth());
const isUser = computed(
  () => isAuth.value && currentUser?.username !== props.username
);
const isCurrentUser = computed(
  () => isAuth.value && currentUser?.username === props.username
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
