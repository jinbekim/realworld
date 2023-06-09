<template>
  <li class="nav-item">
    <router-link
      :to="$props.to"
      class="nav-link"
      :class="{ active: $props.active }"
    >
      <slot></slot>
    </router-link>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string;
  active: boolean;
}>();
</script>
