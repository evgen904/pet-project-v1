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
  {
    path: "/folder",
    name: "FolderView",
    component: () => import("@/views/FolderView"),
  },
  {
    path: "/post",
    name: "PostView",
    component: () => import("@/views/PostView"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
