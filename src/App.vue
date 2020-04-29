<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <router-view />
    </v-content>
    <Round />
  </v-app>
</template>

<script lang="ts">
import Round from '@/components/Round.vue';
import Header from '@/components/Header.vue';
import NameDialog from '@/components/modal-content/NameDialog.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import PlayerService from '@/services/player';
import { ModalService } from '@/domain/modal';

@Component({
  components: {
    'app-header': Header,
    Round,
  },
})
export default class App extends Vue {
  protected created() {
    PlayerService.name$.subscribe((x) => {
      if (!x) {
        this.showNameDialog();
      }

      this.$socket.werewolves.emit('rejoinSession', { name: x });
    });
  }

  private showNameDialog() {
    this.$nextTick(() => {
      ModalService.open(NameDialog, {
        data: {
          cancelable: false,
        },
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.margin-auto {
  margin: 0 auto;
}
</style>

<style lang="scss">
body {
  background: #00d4ff;
  background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(9, 6, 64, 1) 35%, rgba(0, 212, 255, 1) 100%);

  .theme--light.v-application {
    background: inherit;
  }
}
</style>
