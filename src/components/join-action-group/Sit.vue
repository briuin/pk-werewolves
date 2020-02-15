<template>
  <v-btn color="success" v-if="!seated" dark @click="sit()">坐下</v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameService from "@/services/game";
import PlayerService from "@/services/player";
import { tap } from "rxjs/operators";

@Component({
  subscriptions() {
    return {
      seats: GameService.seats$
    };
  }
})
export default class Sit extends Vue {
  public seats: any[] = [];
  get seated() {
    return this.seats.find(x => x.name === PlayerService.getName());
  }

  sit() {
    this.$socket.werewolves.emit("sit");
  }
}
</script>
