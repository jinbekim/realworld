<script setup lang="ts">
import useUser from "@/hooks/useUser";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
function isActive(path: string) {
  return activePath.value === path;
}

const router = useRouter();
const activePath = ref(router.currentRoute.value.path);
const user = useUser();

const links = [
  {
    path: "/",
    name: "Home",
    common: true,
  },
  {
    path: "/editor",
    name: "New Article",
    icon: "ion-compose",
    auth: true,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ion-gear-a",
    auth: true,
  },
  {
    path: "/login",
    name: "Sign in",
    auth: false,
  },
  {
    path: "/register",
    name: "Sign up",
    auth: false,
  },
];

watchEffect(async () => {
  activePath.value = router.currentRoute.value.path;
  user.value = useUser().value;
});
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <template v-for="item in links" :key="item.path">
          <li v-if="item.common || !!user === item.auth" class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isActive(item.path) }"
              :to="item.path"
            >
              <i v-if="item.icon" :class="item.icon"></i>&nbsp;
              {{ item.name }}
            </router-link>
          </li>
        </template>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{ active: isActive(`/@${user?.username}`) }"
            :to="`/@${user?.username}`"
          >
            <img :ng-src="user?.image" class="user-pic" :src="user?.image" />
            {{ user?.username }}</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
