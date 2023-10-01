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
            <RouterLink active-class="active" class="nav-link" to="/">
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink active-class="active" class="nav-link" to="/editor">
              <i class="ion-compose"></i>
              &nbsp;New Article
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink active-class="active" class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>
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
            <RouterLink active-class="active" class="nav-link" to="/">
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink active-class="active" class="nav-link" :to="'/login'">
              Sign in
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              active-class="active"
              class="nav-link"
              :to="'/register'"
            >
              Sign up
            </RouterLink>
          </li>
        </ul>
      </template>
    </header>
  </nav>
</template>
