<template>
  <v-app>
    <v-app-bar v-if="isGameStarted && !isPlayerAlive" app color="red" dark>
      <div class="d-flex align-center margin-auto">
        <span>陣亡</span>
      </div>
    </v-app-bar>
    <v-app-bar v-else-if="isGameStarted" app color="primary" dark>
      <div
        class="d-flex align-center margin-auto"
        @click="isShowCard = !isShowCard"
      >
        <span v-if="!isShowCard">{{ playerName }}</span>
        <span v-else>{{ card.name }}</span>
      </div>
    </v-app-bar>
    <v-app-bar v-else app color="primary" dark>
      <div class="d-flex align-center">
        <span @click="goToHome()">狼人殺</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="!isGameStarted" @click="showCancelableDialog()" text>
        <span class="mr-2">{{ playerName }}</span>
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
      <v-btn v-else text>
        <span class="mr-2">{{ playerName }}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <NameDialog
      :options="nameDialogOptions"
      @confirm="setName($event)"
      @cancel="showNameDialog = false"
      v-if="showNameDialog"
    />
    <Round />
  </v-app>
</template>

<script lang="ts">
import NameDialog from "@/components/NameDialog.vue";
import Round from "@/components/Round.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";
import GameService from "@/services/game";

@Component({
  components: {
    NameDialog,
    Round
  },
  subscriptions() {
    return {
      isGameStarted: GameService.isStarted$,
      isPlayerAlive: GameService.isAlive$,
      card: GameService.card$
    };
  }
})
export default class App extends Vue {
  playerName = "";
  showNameDialog = !this.playerName;
  nameDialogOptions = {
    cancelable: false
  };
  isShowCard = false;

  setName(name: string) {
    PlayerService.setName(name);
    this.playerName = name;
    this.showNameDialog = false;
  }

  showCancelableDialog() {
    this.nameDialogOptions.cancelable = true;
    this.showNameDialog = true;
  }

  goToHome() {
    if (this.$route.path === "/") {
      return;
    }
    this.$router.push("/");
  }

  protected created() {
    PlayerService.name$.subscribe(x => {
      this.playerName = x;
      this.showNameDialog = !x;
      this.$socket.werewolves.emit("rejoinSession", { name: x });
    });
  }
}
</script>

<style lang="scss" scoped>
.margin-auto {
  margin: 0 auto;
}
</style>
