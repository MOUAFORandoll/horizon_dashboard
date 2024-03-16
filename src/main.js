import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import Loader from "@/components/Loader.vue";
import CardMessageReceive from "@/components/CardMessageReceive.vue";
import SmallLoader from "@/components/SmallLoader.vue";

import ImageVue from "@/components/ImageVue.vue";
import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */

const appInstance = createApp(App).use(router).use(pinia);

// eslint-disable-next-line vue/multi-word-component-names
appInstance.component("Message", CardMessageReceive);
appInstance.component("Loader", Loader);
// eslint-disable-next-line vue/multi-word-component-names
appInstance.component("Smallloader", SmallLoader);
appInstance.component("ImageVue", ImageVue);

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");
mainStore.onCreated();
/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Admin ";
/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
appInstance.mount("#app");
