<template>
  <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
    <i class="ion-trash-a"></i>
    &nbsp; Delete Article
  </button>
</template>
<script setup lang="ts">
import { Get } from "@/dependency";
import { isError } from "@/libs/isError";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  slug: string;
}>();

async function deleteArticle() {
  const repo = Get.get("IArticleRepository");
  const result = await repo.deleteArticle(props.slug);
  if (!isError(result)) router.back();
}
</script>
