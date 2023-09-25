<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/components/layouts/TheHeader.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";
</script>


<template>
  <TheHeader></TheHeader>
  <RouterView />
  <TheFooter></TheFooter>
</template>
