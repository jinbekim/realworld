<template>
  <button class="btn btn-outline-danger" @click="logout">
    Or click here to logout.
  </button>
</template>

<script setup lang="ts">
import useUser from '@/store/useUser';

const { user, logout } = useUser();
</script>

<style scoped></style>
