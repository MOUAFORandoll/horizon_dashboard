import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/main";

// import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
  // {
  //   meta: {
  //     title: "Select style",
  //   },
  //   path: "/",
  //   name: "style",
  //   component: Style,
  // },

  {
    meta: {
      title: "Login",
    },
    path: "/Login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },

  {
    meta: {
      title: "Dashboard",
    },
    path: "/",
    name: "Employe",
    component: () => import("@/views/Employe/EmployeView.vue"),
  },
  {
    meta: {
      title: "Paiement",
    },
    path: "/Paiement",
    name: "Paiement",
    component: () => import("@/views/Paiement/PaiementView.vue"),
  },
  {
    meta: {
      title: "Poste",
    },
    path: "/Poste",
    name: "Poste",
    component: () => import("@/views/Employe/PosteView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/:catchAll(.*)*",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to) => {
  const mainStore = useMainStore();

  if (to.name != "login") {
    console.log("connecge------------------", mainStore.id, to.name);
    if (mainStore.id == null) {
      router.push("/Login");
    }
  }
  if (to.name == "login") {
    if (mainStore.id != null) {
      console.log("is login------------------");
      router.push("/");
    }
  }
});
export default router;
