import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import VueSocketIO from 'vue-socket.io';
import vuetify from './plugins/vuetify';
import VueRx from 'vue-rx';
import { ModalService } from '@/domain/modal';
import i18n from './i18n';

const options = {
  i18n,
  vuetify,
};

const vm = createApp({
  ...options,
  router,
  render: (h: any) => h(App),
});

vm.use(VueRx as any);

vm.use(
  new VueSocketIO({
    connection: process.env.NODE_ENV === 'production' ? 'https://pk-center.herokuapp.com/werewolves' : 'http://localhost:3000/werewolves',
    options: { useConnectionNamespace: true },
    debug: true,
  })
);

const app = vm.mount("#app");

ModalService.setContainer(app.$root!.$el, options);
