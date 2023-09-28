import { createRouter, createWebHashHistory } from 'vue-router/auto';
import { type RouteNamedMap } from 'vue-router/auto/routes';
export type RouteName = keyof RouteNamedMap;

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
});

export default router;
