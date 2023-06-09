import { computed } from "vue";
export function onClick(dd) {
  const cc = computed(() => {
    return dd.test5.test7;
  });
  return {
    cc,
  };
}
