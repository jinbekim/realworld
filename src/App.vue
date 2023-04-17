<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Header from "./components/layouts/Header.vue";
import Footer from "./components/layouts/Footer.vue";
import { onErrorCaptured } from "vue";

const router = useRouter();

onErrorCaptured((err) => {
  console.log(err);
  router.replace("/login");
  return false;
});
</script>

<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>
