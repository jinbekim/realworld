<script setup lang="ts">
import useUser from "@/store/useUser";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activePathName = ref(route.name?.toString().split("-")[0] || "/");
const { user, refetch } = useUser();

const links = [
  {
    path: "/",
    name: "home",
    common: true,
  },
  {
    path: "/editor",
    name: "editor",
    icon: "ion-compose",
    auth: true,
  },
  {
    path: "/settings",
    name: "settings",
    icon: "ion-gear-a",
    auth: true,
  },
  {
    path: "/login",
    name: "login",
    auth: false,
  },
  {
    path: "/register",
    name: "register",
    auth: false,
  },
];

function isActive(path: string) {
  if (path === "home")
    return (
      activePathName.value === "global" ||
      activePathName.value === "my" ||
      activePathName.value === "tag"
    );
  return activePathName.value === path;
}

watchEffect(async () => {
  activePathName.value = route.name?.toString().split("-")[0] || "/";
  await refetch();
});
</script>

<template>
  <nav class="navbar navbar-light">
    <header class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <template v-for="item in links" :key="item.path">
          <li v-if="item.common || !!user === item.auth" class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: isActive(item.name) }"
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
            :class="{ active: isActive('profile') }"
            :to="`/@${user?.username}`"
          >
            <img :ng-src="user?.image" class="user-pic" :src="user?.image" />
            {{ user?.username }}</router-link
          >
        </li>
      </ul>
    </header>
  </nav>
</template>
