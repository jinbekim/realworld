<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <span v-if="isError" class="error-messages">
            {{ error }}
          </span>
          <form @submit.prevent="onSubmit">
            <fieldset :disabled="isLoading">
              <fieldset class="form-group">
                <input
                  type="text"
                  name="title"
                  required
                  :value="article.title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  name="description"
                  required
                  :value="article.description"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  name="body"
                  rows="8"
                  :value="article.body"
                  required
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter.prevent="addTag"
                />
                <ul class="tag-list" name="tagList" multiple>
                  <label v-for="tag in tagList" class="tag-default tag-pill">
                    <input name="tagList" :value="tag" hidden />
                    <i
                      class="ion-close-round"
                      :data-tag="tag"
                      @click.prevent="deleteTag"
                    ></i>
                    {{ tag }}
                  </label>
                </ul>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                :disabled="isLoading"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewArticleDto } from '@/shared/api/article';
import type { Article } from '../..';
import { ref } from 'vue';

interface Props {
  article?: Partial<Article>;
  isLoading?: boolean;
  isError?: boolean;
  error: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  article: () => ({ title: '', description: '', body: '', tagList: [''] }),
});

interface Emits {
  (event: 'submit', article: NewArticleDto): void;
}
const emit = defineEmits<Emits>();

const tagList = ref<string[]>(props.article.tagList ?? []);
function addTag(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.value) return;
  if (tagList.value.includes(target.value)) return;
  tagList.value.push(target.value);
  target.value = '';
}

function deleteTag(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const tag = target.dataset.tag;
  tagList.value = tagList.value.filter((val) => val !== tag);
}

const onSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const body = formData.get('body') as string;
  const tagList = formData.getAll('tagList') as string[];

  const article = {
    title,
    description,
    body,
    tagList,
  };
  emit('submit', article);
};
</script>

<style scoped></style>
