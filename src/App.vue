<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import TheHeader from "./components/layouts/TheHeader.vue";
import TheFooter from "./components/layouts/TheFooter.vue";
import { onErrorCaptured } from "vue";

const router = useRouter();

onErrorCaptured((err) => {
  console.log(err);
  console.log("error captured");
  // router.replace("/login");
  return false;
});
</script>

<template>
  <TheHeader></TheHeader>
  <RouterView />
  <TheFooter></TheFooter>
</template>
