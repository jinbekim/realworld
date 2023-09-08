<template>
  <button class="btn btn-outline-danger" @click="deleteUser">
    Or click here to logout.
  </button>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/entities/session/model/sessionModel';

const { deleteUser } = useSessionStore();
</script>

<style scoped></style>
