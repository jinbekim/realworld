<template>
  <!-- <Child>{{ testProxy.test }}</Child> -->
  <!-- <Child :msg="testProxy">{{ testProxy }}</Child> -->
  <div>{{ test }}</div>
  <div>{{ testProxy }}</div>
  <button @click="onClick">click</button>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUpdated, toRef, toRefs } from "vue";
import Child from "./Child.vue";

const testProxy = reactive({
  test: "test",
  test3: "test3",
  test4: "test4",
});

// 이렇게 해도 getter가 알텐데?
let test = testProxy.test;
// reactive나 ref만 감지한다.
// const { test } = toRefs(testProxy);

onMounted(() => {
  console.log("mounted");
  console.log(testProxy);
  console.log(test);
});

onUpdated(() => {
  console.log("updated");
  console.log(testProxy);
  console.log(test);
});
/**
 * fact
 * 각 요소에 직접 접근해도 값은 바뀐다.
 * 하지만 vue 에서 감지하지 못한다.
 * 변화를 감지하면 component를 update한다.
 * component에 reactive나 ref를 넣어야 한다.
 * 아니면 getter가 안달려 있어서 정적 컨텐츠 인줄 알다
 * 한번 컴포넌트가 바뀌면 그리는건 전체를 다시 그린다.
 * 그래서 update가 된다.
 */
function onClick() {
  // disconnect 되네..
  test += "c";
  // testProxy.test += "t";
  if (testProxy.test4 !== "t") testProxy.test4 = "t";
  else testProxy.test4 = "test4 changed";
}
</script>

<style scoped>
* {
  position: relative;
  display: block;
}
</style>
