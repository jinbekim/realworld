<route lang="json">
  {
    "props": true
  }
</route>
<script setup lang="ts">
import type { Tag } from '@/entities/tag/api/tag';



interface Props {
  tag: Tag
}
const props = defineProps<Props>();

</script>

<template>
  {{ tag }}
</template>
