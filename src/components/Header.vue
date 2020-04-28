<template>
  <v-app-bar v-if="isGameStarted" app :color="isPlayerAlive ? '#020024' : 'red'" dark>
    <div class="d-flex align-center margin-auto" style="width:100%" @click="isShowCard = !isShowCard">
      <v-spacer></v-spacer>
      <span v-if="!isShowCard">
        <template v-if="seatNo > 0">
          {{ seatNo }}號
          <v-icon v-if="isShowCard">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </template>
        {{ isPlayerAlive ? playerName : '陣亡' }}
      </span>
      <span v-else>
        <template v-if="seatNo > 0">
          {{ seatNo }}號
          <v-icon v-if="isShowCard">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </template>
        {{ card.name }}
      </span>
      <v-spacer></v-spacer>
    </div>
  </v-app-bar>
  <v-app-bar v-else app color="#020024" dark>
    <div class="d-flex align-center">
      <span @click="goToHome()">狼人殺</span>
    </div>

    <v-spacer></v-spacer>

    <template v-if="isHomePage">
      <v-btn v-if="!isGameStarted" @click="showCancelableDialog()" text>
        <span class="mr-2">{{ playerName }}</span>
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
      <v-btn v-else text>
        <span class="mr-2">{{ playerName }}</span>
      </v-btn>
    </template>
    <template v-else>
      <v-btn color="red" v-if="!isGameStarted" @click="leaveGame()" text>
        <span class="mr-2">退出</span>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import NameDialog from '@/components/NameDialog.vue';
import GameService from '@/services/game';
import PlayerService from '@/services/player';
import { ModalService } from '@/domain/modal';
import { Route } from 'vue-router';

@Component({
  subscriptions() {
    return {
      isGameStarted: GameService.isStarted$,
      isPlayerAlive: GameService.isAlive$,
      card: GameService.card$,
      seatNo: GameService.seatNo$,
      playerName: PlayerService.name$,
    };
  },
})
export default class Header extends Vue {
  isHomePage = false;
  isShowCard = false;
  isGameStarted = false;
  isPlayerAlive = false;

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newRoute: Route) {
    this.isHomePage = newRoute.name === 'home';
  }

  showCancelableDialog() {
    ModalService.open(NameDialog, {
      data: {
        cancelable: true,
      },
    });
  }

  leaveGame() {
    this.$socket.werewolves.emit('leave');
    this.goToHome();
  }

  goToHome() {
    if (this.$route.path === '/') {
      return;
    }
    this.$router.push('/');
  }
}
</script>

<style lang="scss">
.v-app-bar {
  z-index: 5000 !important;
}
</style>
