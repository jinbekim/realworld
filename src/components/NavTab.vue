<template>
  <li class="nav-item">
    <RouterLink :to="to" class="nav-link">
      <slot></slot>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
interface Props {
  to: string;
}
defineProps<Props>();
</script>
