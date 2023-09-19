import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { useSessionStore } from './entities/session/model/sessionModel';

const pinia = createPinia();
const app = createApp(App);

router.beforeEach((to, from, next) => {
  const store = useSessionStore();

  if (to.meta.requiresAuth === true && store.isAuth === false) return false;
  else next();
});
app.use(router);
app.use(pinia);
app.use(VueQueryPlugin);

app.mount('#app');
