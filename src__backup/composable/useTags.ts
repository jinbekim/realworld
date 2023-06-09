import { Get } from "@/dependency";
import type { Tag } from "@/infrastructure/tag";
import { onBeforeMount, onMounted, ref } from "vue";
import { isError } from "@/libs/isError";

export const useTags = () => {
  const tags = ref<Tag[]>([]);
  const isLoading = ref(false);

  const fetchTags = async () => {
    isLoading.value = true;
    const repo = Get.get("ITagRepository");
    const result = await repo.getAll();
    isLoading.value = false;
    if (!isError(result)) tags.value = result;
  };

  onBeforeMount(async () => {
    await fetchTags();
  });

  return {
    tags,
    isLoading,
    fetchTags,
  };
};
