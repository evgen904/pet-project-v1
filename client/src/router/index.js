import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/ui",
    name: "UI",
    component: () => import("@/views/UiView"),
  },
  {
    path: "/",
    name: "JsView",
    component: () => import("@/views/JsView"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
