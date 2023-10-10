<template>
  <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
    <i class="ion-trash-a"></i>
    &nbsp; Delete Article
  </button>
</template>

<script setup lang="ts">
import { useDeleteArticleMutation } from '../api/delete';

interface Props {
  slug: UniqueId;
}

const props = defineProps<Props>();
  const { mutate } = useDeleteArticleMutation();
const deleteArticle = () => {
  mutate(props.slug, {
  })
}

</script>

<style scoped>

</style>
