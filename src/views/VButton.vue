<template>
  <button :class="$style['red']" :class="[ss[props.size], hh[props.height]]">
    <slot> </slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  size: "large" | "small";
  height: "large" | "small";
}>();
</script>

<style module>
.red {
  color: red;
}
</style>

<style module="ss">
.large {
  padding: 10px 20px;
  font-size: 1.2rem;
}

.small {
  padding: 5px 10px;
  font-size: 0.8rem;
}
</style>

<style module="hh">
.large {
  height: 100px;
}
.small {
  height: 50px;
}
</style>
