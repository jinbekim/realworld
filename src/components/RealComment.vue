<script setup lang="ts">
import useUser from "@/hooks/useUser";
import { IComment } from "@/domain/Comment";
import { toUrlEncode } from "@/libs/encodeURL";

const { comment } = defineProps({
  comment: {
    type: IComment,
    required: true,
  },
});

const user = useUser();
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
        >{{ comment.username }}</router-link
      >
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span
        v-if="comment.author.username === user?.username"
        class="mod-options"
      >
        <i class="ion-edit"></i>
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
