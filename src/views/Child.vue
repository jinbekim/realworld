import { onMounted, onUpdated, ref, watchEffect } from 'vue';
<template>
  <slot></slot>
  {{ tt }}
  <!-- <div>{{ msg }}</div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, useSlots, watchEffect } from "vue";

// props를 안주면 여기는 따로 자체 ref를 선언해 주지 않는이상
//업데이트 될 일이 없다.
defineProps<{
  msg?: any;
}>();

const tt = ref("tt");

onMounted(() => {
  console.log("mounted child");
});

/**!SECTION
 * prop이 바뀌면 update가 된다.
 */
onUpdated(() => {
  console.log("updated child");
});
const s = useSlots();

watchEffect(() => {
  s.default;
  console.log("watch");
});
</script>

<style scoped>
* {
  position: relative;
  display: block;
}
</style>
