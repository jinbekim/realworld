<script setup lang="ts">
import { useSessionStore } from '@/entities/session/model/sessionModel';

const store = useSessionStore();
</script>

<template>
  <nav class="navbar navbar-light">
    <header class="container">
      <RouterLink class="navbar-brand" to="/">conduit</RouterLink>
      <template v-if="store.currentUser">
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="{ name: 'home' }"
            >
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="{ name: '/ArticleEdit' }"
            >
              <IoCreateOutline size="{16}" />
              &nbsp;New Article
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="{ name: '/settings' }"
            >
              <IoSettingsSharp size="{16}" />
              &nbsp;Settings
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="`/@${store.currentUser.username}`"
            >
              <img
                class="user-pic"
                :src="store.currentUser.image"
                :alt="store.currentUser.username"
              />
              {{ store.currentUser.username }}
            </RouterLink>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="{ name: 'home' }"
            >
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="{ name: '/login' }"
            >
              Sign in
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="{ name: '/register' }"
            >
              Sign up
            </RouterLink>
          </li>
        </ul>
      </template>
    </header>
  </nav>
</template>
