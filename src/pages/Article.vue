<script setup lang="ts">
import { computed, onMounted, ref, toRef } from 'vue';
import { useRouter } from 'vue-router';
import RealMiniProfile from '@/components/RealMiniProfile.vue';
import RealFavoriteButton from '@/components/buttons/RealFavoriteButton.vue';
import RealEditArticleButton from '@/components/buttons/RealEditArticleButton.vue';
import RealDeleteArticleButton from '@/components/buttons/RealDeleteArticleButton.vue';
import RealComment from '@/components/RealComment.vue';

// const props = defineProps({
//   slug: {
//     type: String,
//     required: true,
//   },
// });
// // const slug = toRef(props, "slug");
// const slug = ref<string>("sdijf");

// const router = useRouter();
// const article = ref<Article>();
// const { comments } = useComments(slug.value);
// const isPostMine = computed(() => {
//   if (!article.value) return false;
//   return article.value.author.username === user.value?.username;
// });

// onMounted(async () => {
//   const ret = await getArticle();
//   if (!isError(ret)) {
//     article.value = {
//       ...ret,
//       body: converter.makeHtml(ret.body),
//     };
//   } else router.replace("/login");

//   const ret2 = await getComments();
//   if (!isError(ret2)) comments.value = ret2;
//   else router.replace("/login");
// });

// async function getArticle() {
//   const repo = Get.get("IArticleRepository");
//   const article = await repo.getArticle(slug.value);
//   return article;
// }

// async function getComments() {
//   const repo = Get.get("ICommentRepository");
//   const comments = await repo.get(slug.value);
//   return comments;
// }
</script>

<template>
  <!-- <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article?.title }}</h1>

        <div class="article-meta">
          <real-mini-profile :item="article"> </real-mini-profile>
          <template v-if="isPostMine">
            <real-edit-article-button :slug="slug" />
            &nbsp;
            <real-delete-article-button :slug="slug" />
          </template>
          <template v-else>
            <real-follow-button :user="article.author" />
            &nbsp;
            <real-favorite-button :item="article" full />
          </template>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ article?.description }}
          </p>
          <h2 id="introducing-ionic">{{ article?.title }}</h2>
          <p v-html="article.body"></p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <real-mini-profile :item="article"> </real-mini-profile>

          <template v-if="isPostMine">
            <real-edit-article-button :slug="slug" />
            &nbsp;
            <real-delete-article-button :slug="slug" />
          </template>
          <template v-else>
            <real-follow-button :user="article.author" />
            &nbsp;
            <real-favorite-button :item="article" full />
          </template>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <real-comment :slug="slug"></real-comment>
        </div>
      </div>
    </div>
  </div> -->
</template>
