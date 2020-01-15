import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "vue-socket.io";

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
  render: h => h(App)
}).$mount("#app");
