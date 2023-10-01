<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TheHeader, TheFooter } from '@/shared/ui';
import { useSessionStore } from '@/entities/session/model/sessionModel';
import { useCurrentUser } from '@/entities/session/api/sessionApi';
import { computed } from 'vue';

const { currentUser } = useSessionStore();
useCurrentUser(computed(() => !currentUser));
</script>

<template>
  <TheHeader></TheHeader>
  <RouterView />
  <TheFooter></TheFooter>
</template>
