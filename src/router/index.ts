import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomeView from "../views/Home.vue";
import NotFound from "../views/error/NotFound.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    //     Home page (URL: / )
    // List of tags
    // List of articles pulled from either Feed, Global, or by Tag
    // Pagination for list of articles
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // Sign in/Sign up pages (URL: /login, /register )
    // Uses JWT (store the token in localStorage)
    // Authentication can be easily switched to session/cookie based
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Login.vue"),
    },
    // Settings page (URL: /settings )
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/Settings.vue"),
    },
    //Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
    {
      path: "/editor/:slug?",
      name: "editor",
      component: () => import("../views/ArticleEdit.vue"),
      props: true,
    },
    //     Article page (URL: /article/article-slug-here )
    // Delete article button (only shown to article's author)
    // Render markdown from server client side
    // Comments section at bottom of page
    // Delete comment button (only shown to comment's author)
    {
      path: "/article/:slug",
      name: "article",
      component: () => import("../views/Article.vue"),
      props: true,
    },
    //     Profile page (URL: /profile/:username, /profile/:username/favorites )
    // Show basic user info
    // List of articles populated from author's created articles or author's favorited articles
    {
      path: "/profile/:username",
      name: "profile",
      component: () => import("../views/Profile.vue"),
      props: true,
    },
    {
      path: "/@:username",
      name: "profile",
      component: () => import("../views/Profile.vue"),
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
