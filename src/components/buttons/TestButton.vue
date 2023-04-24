<template>
  <button @click="onClick">Click me!</button>
</template>

<script setup lang="ts">
function onClick() {
  console.log("button click");
}
</script>
