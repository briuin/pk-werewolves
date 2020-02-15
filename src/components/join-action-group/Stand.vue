<template>
  <v-btn color="warning" v-if="seated" dark @click="stand()">站立</v-btn>
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
export default class Stand extends Vue {
  public seats: any[] = [];
  get seated() {
    return this.seats.find(x => x.name === PlayerService.getName());
  }

  stand() {
    this.$socket.werewolves.emit("stand");
  }
}
</script>
