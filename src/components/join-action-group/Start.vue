<template>
  <v-btn
    color="primary"
    :disabled="!isAllSeatedPlayersReady || seats.length !== cards.length"
    v-if="isOwner"
    @click="start()"
  >開始</v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameService from "@/services/game";
import PlayerService from "@/services/player";

@Component({
  subscriptions() {
    return {
      seats: GameService.seats$,
      isOwner: GameService.isOwner$,
      cards: GameService.assignedCards$
    };
  }
})
export default class Start extends Vue {
  public seats: any[] = [];
  get seated() {
    return this.seats.find(x => x.name === PlayerService.getName());
  }

  get isAllSeatedPlayersReady() {
    return this.seats.length > 0 && this.seats.every(x => x.isReady);
  }

  start() {
    if (!this.isAllSeatedPlayersReady) {
      return;
    }
    this.$socket.werewolves.emit("start");
  }
}
</script>
