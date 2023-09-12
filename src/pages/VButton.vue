<template>
  <button :class="[size, height]">
    <slot> </slot>
  </button>
</template>

<script setup lang="ts">
type Props =
  | {
      icon: number;
      size: "small";
      height: "low";
    }
  | {
      size: "large" | "small";
      height: "high" | "low";
    };

const props = defineProps<Props>();
</script>

<style scoped>
.large {
  padding: 10px 20px;
  font-size: 1.2rem;
}

.small {
  padding: 5px 10px;
  font-size: 0.8rem;
}
.high {
  background-color: #f00;
}
.low {
  background-color: #0f0;
}
</style>
