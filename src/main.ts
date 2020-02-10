import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "vue-socket.io";
import vuetify from "./plugins/vuetify";
import VueRx from "vue-rx";

Vue.use(VueRx);
Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    connection: `http://localhost:3003/chat`,
    options: {
      useConnectionNamespace: true,
      namespaceName: "chat"
    },
    debug: true
  })
);

Vue.use(
  new VueSocketIO({
    connection: `http://localhost:3003/werewolves`,
    options: { useConnectionNamespace: true },
    debug: true
  })
);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
