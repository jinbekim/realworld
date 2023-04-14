<script setup lang="ts">
import { Get } from "@/dependency";
import type { Article } from "@/domain/Article";
import { isError } from "@/libs/isError";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { toUrlEncode } from "@/libs/encodeURL";
import type { IComment } from "@/domain/Comment";
import useUser from "@/hooks/useUser";
import RealComment from "@/components/RealComment.vue";

const { slug } = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const user = useUser();
const article = ref<Article>();
const comments = ref<IComment[]>([]);

onMounted(async () => {
  const ret = await getArticle();
  if (!isError(ret)) article.value = ret;
  else router.replace("/login");

  const ret2 = await getComments();
  if (!isError(ret2)) comments.value = ret2;
  else router.replace("/login");
});

async function getArticle() {
  const repo = Get.get("IArticleRepository");
  const article = await repo.getArticle(slug);
  return article;
}

async function getComments() {
  const repo = Get.get("ICommentRepository");
  const comments = await repo.get(slug);
  return comments;
}
</script>

<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article?.title }}</h1>

        <div class="article-meta">
          <router-link to=""><img :src="article?.author.image" /></router-link>
          <div class="info">
            <router-link to="" class="author">{{
              article?.author.username
            }}</router-link>
            <span class="date">{{ article?.createdAt }}</span>
          </div>
          <button
            :class="{ active: article?.author.following }"
            class="btn btn-sm btn-outline-secondary"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ article?.author.username }}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{ active: article?.favorited }"
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article?.favoritesCount }})</span>
          </button>
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
          <p>{{ article?.body }}</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <router-link :to="`/profile/${toUrlEncode(article?.author.username)}`"
            ><img :src="article?.author.image"
          /></router-link>
          <div class="info">
            <router-link to="" class="author">{{
              article?.author.username
            }}</router-link>
            <span class="date">{{ article?.createdAt }}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ article?.author.username }}
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="article.author.image" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <template v-if="comments" v-for="comment in comments">
            <real-comment :comment="comment"></real-comment>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
