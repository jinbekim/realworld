import { createApp, ref, type InjectionKey, type Ref } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { useSessionStore } from './entities/session';
import router from '@/app/router';
import './main.css';
import { key } from './shared/ui/dialog';

const pinia = createPinia();
const app = createApp(App);

router.beforeEach((to, from, next) => {
  const store = useSessionStore();

  if (to.meta.requiresAuth && !store.useAuth()) return next('/');
  if (to.meta.guestOnly && store.useAuth()) return next('/');
  else next();
});
app.use(router);
app.use(pinia);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
        retry: false,
      },
    },
  },
});

app.provide(key, ref(''));

app.mount('#app');
