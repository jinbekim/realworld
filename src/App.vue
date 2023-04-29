<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/layouts/TheHeader.vue";
import TheFooter from "./components/layouts/TheFooter.vue";
import { onErrorCaptured } from "vue";

// REVIEW - error boundary
onErrorCaptured((err) => {
  console.log(err);
  console.log("error captured");
  return false;
});
</script>

<!-- REVIEW - The 템플릿에 하나  -->
<template>
  <TheHeader></TheHeader>
  <RouterView />
  <TheFooter></TheFooter>
</template>
