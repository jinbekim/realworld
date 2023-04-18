<template>
  <nav v-if="props.total">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{
          active: i * 10 === props.offset,
        }"
        v-for="(_, i) in totalPages"
        @click="() => props.onClickPage(i)"
      >
        {{ i + 1 }}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  total: number;
  limit: number;
  offset: number;
  onClickPage: (page: number) => void;
}>();

const totalPages = computed(() => {
  return Math.ceil(props.total / props.limit);
});
</script>

<style scoped>
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
  list-style: none;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}

.page-item {
  position: relative;
  float: left;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  color: #5cb85c;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}

.active {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #5cb85c;
  border-color: #5cb85c;
}
</style>
