import { Get } from '@/dependency';
import type { IComment } from '@/entities/comment/Comment';
import { isError } from 'lodash';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useComments = (slug: string) => {
  const comments = ref<IComment[]>([]);
  const text = ref('');
  const router = useRouter();

  // onMounted(async () => {
  //   const result = await getComments();
  //   if (!isError(result)) comments.value = result;
  //   else router.replace('/login');
  // });

  async function getComments() {
    const repo = Get.get('ICommentRepository');
    const comments = await repo.get(slug);
    return comments;
  }

  async function deleteComment(id: number) {
    const commentRepository = Get.get('ICommentRepository');
    const ret = await commentRepository.delete(slug, id);
    if (!isError(ret)) {
      comments.value = comments.value.filter((c) => c.id !== id);
    }
  }

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!text.value) return;
    const repo = Get.get('ICommentRepository');
    const comment = await repo.add(slug, { body: text.value });
    if (!isError(comment)) {
      // comments.value.push(comment);
      text.value = '';
    }
  }
  return {
    text,
    comments,
    getComments,
    deleteComment,
    onSubmit,
  };
};
