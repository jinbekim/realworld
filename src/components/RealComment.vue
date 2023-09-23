<script setup lang="ts">
import { computed, ref } from 'vue';
import { useComments } from '@/composable/useComments';
import { Get } from '@/dependency';

// const { user } = useUser();
const props = defineProps<{ slug: string }>();
const { text, onSubmit, comments, deleteComment } = useComments(props.slug);

// const isMine = (username: string) => {
//   return user.value?.username === username;
// };
</script>

<template>
  <!-- <p v-if="!user">
    <RouterLink to="/login"> Sign in </RouterLink> &nbsp;or&nbsp;
    <RouterLink to="/register">sign up</RouterLink> to add comments on this
    article.
  </p>

  <div v-else>
    <form class="card comment-form" @submit="onSubmit">
      <div class="card-block">
        <textarea
          v-model="text"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user?.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div v-if="comments" v-for="comment in comments">
      <div class="card">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <RouterLink
            :to="`/profile/${toUrlEncode(comment.author.username)}`"
            class="comment-author"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </RouterLink>
          &nbsp;
          <RouterLink
            :to="`/profile/${toUrlEncode(comment.author.username)}`"
            class="comment-author"
            >{{ comment.author.username }}</router-link
          >
          <span class="date-posted">{{ comment.createdAt }}</span>
          <span
            v-if="isMine(comment.author.username)"
            class="mod-options"
            @click="() => deleteComment(comment.id)"
          >
            <i class="ion-trash-a"></i>
          </span>
        </div>
      </div>
    </div>
  </div> -->
</template>
