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
    <router-link to="/login"> Sign in </router-link> &nbsp;or&nbsp;
    <router-link to="/register">sign up</router-link> to add comments on this
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
