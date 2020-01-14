import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  connection: `http://localhost:3003/chat`,
    options: { useConnectionNamespace: true },
    debug: false,
}));

Vue.use(new VueSocketIO({
  connection: `http://localhost:3003/werewolves`,
    options: { useConnectionNamespace: true },
    debug: false,
}));

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
