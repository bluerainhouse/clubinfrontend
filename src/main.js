import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BootstrapVue3 from "bootstrap-vue-3";
import { FontAwesomeIcon } from "./plugins/font-awesome";

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(BootstrapVue3)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
