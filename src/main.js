import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(Vuelidate);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
