<script setup lang="ts">
import { provide, ref } from "vue";
import {
  loginTitleKey,
  loginRouterKey,
  loginRouterType,
  loginTitleType,
} from "./auth/useLoginTitle";
import LoginTemplate from "./LoginTemplate.vue";

const loginTitle = ref<loginTitleType>("login");
const loginRouter = ref<loginRouterType>("./login");

provide(loginTitleKey, loginTitle);
provide(loginRouterKey, loginRouter);
</script>

<template>
  <LoginTemplate></LoginTemplate>
</template>
