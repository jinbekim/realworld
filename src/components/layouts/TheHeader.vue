<script setup lang="ts">
import { useSessionStore } from '@/entities/session/model/sessionModel';

const { currentUser } = useSessionStore();
</script>

<template>
  <nav class="navbar navbar-light">
    <header class="container">
      <RouterLink class="navbar-brand" to="/">conduit</RouterLink>
      <template v-if="currentUser">
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item" :class="{ active: $route.name === 'home' }">
            <RouterLink class="nav-link" :to="{ name: 'home' }">
              Home
            </RouterLink>
          </li>
          <li
            class="nav-item"
            :class="{ active: $route.name === '/ArticleEdit' }"
          >
            <RouterLink class="nav-link" :to="{ name: '/ArticleEdit' }">
              <IoCreateOutline size="{16}" />
              &nbsp;New Article
            </RouterLink>
          </li>
          <li class="nav-item" :class="{ active: $route.name === '/Settings' }">
            <RouterLink class="nav-link" :to="{ name: '/Settings' }">
              <IoSettingsSharp size="{16}" />
              &nbsp;Settings
            </RouterLink>
          </li>
          <li class="nav-item" :class="{ active: $route.name === '/Profile' }">
            <RouterLink class="nav-link" :to="{ name: '/Profile' }">
              <img
                class="user-pic"
                :src="currentUser.image"
                :alt="currentUser.username"
              />
              {{ currentUser.username }}
            </RouterLink>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item" :class="{ active: $route.name === 'home' }">
            <RouterLink class="nav-link" :to="{ name: 'home' }">
              Home
            </RouterLink>
          </li>
          <li class="nav-item" :class="{ active: $route.name === '/login' }">
            <RouterLink class="nav-link" :to="{ name: '/login' }">
              Sign in
            </RouterLink>
          </li>
          <li class="nav-item" :class="{ active: $route.name === '/register' }">
            <RouterLink class="nav-link" :to="{ name: '/register' }">
              Sign up
            </RouterLink>
          </li>
        </ul>
      </template>
    </header>
  </nav>
</template>
