import { Get } from '@/dependency';
import { onBeforeMount, onMounted, ref } from 'vue';

export const useTags = () => {
  const tags = ref<Tag[]>([]);
  const isLoading = ref(false);

  const fetchTags = async () => {
    isLoading.value = true;
    const repo = Get.get('ITagRepository');
    const result = await repo.getAll();
    isLoading.value = false;
    // if (result) tags.value = result;
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
