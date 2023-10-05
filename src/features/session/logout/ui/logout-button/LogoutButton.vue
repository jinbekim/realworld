<template>
  <button class="btn btn-outline-danger" @click="handleClick">
    Or click here to logout.
  </button>
</template>

<script setup lang="ts">
import { logout } from '../../api/logout';
import { useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router/auto';

const router = useRouter();

const queryClient = useQueryClient();
const handleClick = () => {
  logout(queryClient);
  router.replace('/login');
}
</script>

<style scoped></style>
