<template>
  <v-btn color="success" v-if="seated && !(seated.isReady)" dark @click="ready()">準備</v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameService from "@/services/game";
import PlayerService from "@/services/player";

@Component({
  subscriptions() {
    return {
      seats: GameService.seats$
    };
  }
})
export default class Ready extends Vue {
  public seats: any[] = [];
  get seated() {
    return this.seats.find(x => x.name === PlayerService.getName());
  }

  ready() {
    this.$socket.werewolves.emit("ready");
  }
}
</script>
