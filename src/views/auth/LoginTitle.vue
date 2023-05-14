<template>
  <h1 class="text-xs-center">{{ title.h1 }}</h1>
  <p class="text-xs-center">
    <router-link :to="handleRouter">{{ title.p }}</router-link>
  </p>
</template>

<script setup lang="ts">
import { useLoginRouter, useLoginTitle } from "./useLoginTitle";

const title = useLoginTitle();

const handleRouter = useLoginRouter();
</script>

<style scoped></style>
