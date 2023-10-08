<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TheHeader, TheFooter, TheDialog } from '@/shared/ui';
import { useSessionStore, useCurrentUser } from '@/entities/session';
import { computed } from 'vue';

const { currentUser } = useSessionStore();
const { isLoading } = useCurrentUser(computed(() => !currentUser));
</script>

<template>
  <template v-if="!isLoading">
    <TheHeader></TheHeader>
    <RouterView />
    <TheFooter></TheFooter>
    <TheDialog></TheDialog>
  </template>
</template>
