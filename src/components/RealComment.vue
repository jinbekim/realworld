<script setup lang="ts">
import useUser from "@/hooks/useUser";
import type { IComment } from "@/domain/Comment";
import { toUrlEncode } from "@/libs/encodeURL";
import { computed } from "vue";
import { Get } from "@/dependency";
import { isError } from "@/libs/isError";

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
  comment: {
    type: Object as () => IComment,
    required: true,
  },
});

const user = useUser();
const isMine = computed(() => {
  if (!props.comment.author) return false;
  return props.comment.author.username === user.value?.username;
});

const emit = defineEmits<{
  (event: "delete", comment: IComment): void;
}>();

//컴포저블로 상위로 올리는게 낫지 않을까?
async function deleteComment() {
  const commentRepository = Get.get("ICommentRepository");
  const ret = await commentRepository.delete(props.slug, props.comment.id);
  if (!isError(ret)) emit("delete", props.comment);
}
</script>

<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <router-link
        :to="`/profile/${toUrlEncode(comment.author.username)}`"
        class="comment-author"
      >
        <img :src="comment.author.image" class="comment-author-img" />
      </router-link>
      &nbsp;
      <router-link
        :to="`/profile/${toUrlEncode(comment.author.username)}`"
        class="comment-author"
        >{{ comment.author.username }}</router-link
      >
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span v-if="isMine" class="mod-options" @click="deleteComment">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
