import { createApp } from "vue";
import { createPinia } from "pinia";
import "primevue/resources/themes/aura-light-indigo/theme.css";
import "./style.css";
import PrimeVue from "primevue/config";
import App from "./App.vue";

import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.mount("#app");
