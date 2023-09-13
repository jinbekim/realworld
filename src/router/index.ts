import { createRouter, createWebHashHistory } from 'vue-router/auto';

// const router = createRouter({
//   history: createWebHashHistory(import.meta.env.BASE_URL),
//   routes: [
//     //     Home page (URL: / )
//     // List of tags
//     // List of articles pulled from either Feed, Global, or by Tag
//     // Pagination for list of articles
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//       //REVIEW -  아마 부모 자식 둘다 true로 해야 props가 전달되는 것 같다.
//       props: true,
//       children: [
//         {
//           path: '',
//           name: 'global-feed',
//           component: HomeView,
//         },
//         {
//           path: 'my-feed',
//           name: 'my-feed',
//           component: HomeView,
//         },
//         {
//           path: ':tag',
//           name: 'tag-feed',
//           component: HomeView,
//           // REVIEW - props -> true로 해야 props가 전달된다. children에서는 router
//           props: true,
//         },
//       ],
//     },
//     // {
//     //   path: "/tags/:tag",
//     //   name: "tags",
//     //   component: () => import("../pages/Home.vue"),
//     //   props: true,
//     // },
//     // Sign in/Sign up pages (URL: /login, /register )
//     // Uses JWT (store the token in localStorage)
//     // Authentication can be easily switched to session/cookie based
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('../pages/login.vue'),
//     },
//     {
//       path: '/register',
//       name: 'register',
//       component: () => import('../pages/register.vue'),
//     },
//     // Settings page (URL: /settings )
//     {
//       path: '/settings',
//       name: 'settings',
//       component: () => import('../pages/Settings.vue'),
//     },
//     //Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
//     {
//       path: '/editor/',
//       name: 'editor',
//       component: () => import('../pages/ArticleEdit.vue'),
//       props: true,
//       children: [
//         {
//           path: ':slug',
//           name: 'editor-slug',
//           component: () => import('../pages/ArticleEdit.vue'),
//           props: true,
//         },
//       ],
//     },
//     //     Article page (URL: /article/article-slug-here )
//     // Delete article button (only shown to article's author)
//     // Render markdown from server client side
//     // Comments section at bottom of page
//     // Delete comment button (only shown to comment's author)
//     {
//       path: '/articles/:slug',
//       name: 'articles',
//       component: () => import('../pages/Article.vue'),
//       props: true,
//     },
//     //     Profile page (URL: /profile/:username, /profile/:username/favorites )
//     // Show basic user info
//     // List of articles populated from author's created articles or author's favorited articles
//     {
//       path: '/@:username',
//       name: 'profile',
//       component: () => import('../pages/Profile.vue'),
//       props: true,
//       children: [
//         {
//           path: '',
//           name: 'profile-articles',
//           component: () => import('../components/RealArticles.vue'),
//         },
//         {
//           path: 'favorites',
//           name: 'profile-favorites',
//           component: () => import('../components/RealArticles.vue'),
//         },
//       ],
//     },
//     { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
//   ],
// });
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
});

export default router;
