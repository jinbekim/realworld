<script setup lang="ts"></script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <!-- 내부 상태변경 만으로 login페이지를 공통으로 사용하고 싶은데
        어떻게 해야할가?
        url변경이 안됨.
         -> 걍 라우트 따로 놓고 컴포넌트는 공통으로 쓰는게 맞는듯
         그럼 따로 리랜더 안됨
         그리고 path로 구분해서 상태로 쓰면 될듯
      -->
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
