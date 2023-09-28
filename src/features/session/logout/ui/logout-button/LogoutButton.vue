<template>
  <button class="btn btn-outline-danger" @click="handleClick">
    Or click here to logout.
  </button>
</template>

<script setup lang="ts">
import { logout } from '../../api/logout';
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();
const handleClick = () => logout(queryClient);
</script>

<style scoped></style>
