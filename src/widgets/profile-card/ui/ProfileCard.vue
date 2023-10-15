<template>
  <div class="user-info" v-loading="isLoading">
    <div class="container" v-if="profile">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{ profile.username }}</h4>
          <p>
            {{ profile.bio }}
          </p>
          <template v-if="isCurrentUser">
            <RouterLink
              to="/settings"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </RouterLink>
          </template>
          <template v-if="isUser">
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
</template>

<script setup lang="ts">
import { vLoading } from '@/shared/directives';
import { FollowButton } from '@/features/profile/follow/follow-profile';
import { UnfollowButton } from '@/features/profile/follow/unfollow-profile';
import { useProfile } from '@/entities/profile';
import { computed } from 'vue';
import { useSessionStore } from '@/entities/session';

interface Props {
  username: string;
}
const props = defineProps<Props>();

const { data: profile, isLoading } = useProfile(props.username, {
  enabled: computed(() => !!props.username),
});

const { useAuth, currentUser } = useSessionStore();
const isAuth = computed(() => useAuth());
const isGuest = computed(() => !useAuth());
const isUser = computed(
  () => isAuth.value && currentUser?.username !== props.username
);
const isCurrentUser = computed(
  () => isAuth.value && currentUser?.username === props.username
);
</script>

<style scoped></style>
