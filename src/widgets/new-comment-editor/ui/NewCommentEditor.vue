<template>
  <template v-if="!currentUser">
    <p>
      <RouterLink to="/login"> Sign in </RouterLink> &nbsp;or&nbsp;
      <RouterLink to="/register">sign up</RouterLink> to add comments on this
      article.
    </p>
  </template>

  <template v-else>
    <form class="card comment-form" @submit="onSubmit">
      <div class="card-block">
        <textarea
          name="body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img
          :src="currentUser?.image"
          class="comment-author-img"
          :alt="currentUser?.username"
        />
        <button
          :disabled="isLoading"
          type="submit"
          class="btn btn-sm btn-primary"
        >
          Post Comment
        </button>
      </div>
    </form>
  </template>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/entities/session';
import { useCreateCommentMutation } from '@/features/comment/add';
import { useQueryClient } from '@tanstack/vue-query';

interface Props {
  slug: string;
}
const props = defineProps<Props>();

const { currentUser } = useSessionStore();

const queryClient = useQueryClient();
const { mutateAsync, isLoading } = useCreateCommentMutation(queryClient);
const onSubmit = async (event: Event) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const body = formData.get('body') as string;

  await mutateAsync({ slug: props.slug, newComment: { body } });
};
</script>

<style scoped></style>
