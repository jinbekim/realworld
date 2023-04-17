<script setup lang="ts">
import { Get } from "@/dependency";
import { getErrorMessage, isError } from "@/libs/isError";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{
  slug: string;
}>();

const formModel = reactive({
  title: "",
  description: "",
  body: "",
  tagList: [] as string[],
});

const errors = reactive<{ message: string }>({
  message: "",
});

async function onSubmit() {
  console.log(formModel);
  errors.message = "";

  if (!formModel.title || !formModel.description || !formModel.body) {
    return;
  }
  const repo = Get.get("IArticleRepository");
  if (props.slug) {
    const result = await repo.updateArticle(props.slug, {
      title: formModel.title,
      description: formModel.description,
      body: formModel.body,
    });
    console.log(result);
  } else {
    const result = await repo.createArticle({
      title: formModel.title,
      description: formModel.description,
      body: formModel.body,
      tagList: formModel.tagList,
    });
    if (isError(result)) {
      errors.message = getErrorMessage(result);
      return;
    } else {
      // FIXME 안되
      router.push(`/article/${result.slug}`);
    }
    console.log(result);
  }
}

function addTag(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLInputElement;
  formModel.tagList.push(target.value);
  target.value = "";
}

function deleteTag(e: Event) {
  const target = e.target as HTMLDivElement;
  const index = formModel.tagList.indexOf(target.innerText);
  formModel.tagList.splice(index, 1);
}
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <span v-if="errors.message" class="error-messages">
            {{ errors.message }}
          </span>
          <form @submit.prevent="onSubmit" @keydown.enter.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="formModel.title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="formModel.description"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  v-model="formModel.body"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter="addTag"
                />
                <ul class="tag-list">
                  <span
                    v-for="tag in formModel.tagList"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" @click="deleteTag"></i>
                    {{ tag }}
                  </span>
                </ul>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
