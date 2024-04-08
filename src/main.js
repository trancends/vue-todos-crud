import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Lara from "@/presets/lara"; //import preset
import "./style.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
app.use(ToastService);

app.mount("#app");
