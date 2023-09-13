import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

const pinia = createPinia();
const app = createApp(App);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === false) next({ name: '/' });
  else next();
});
app.use(router);
app.use(pinia);
app.use(VueQueryPlugin);

app.mount('#app');
