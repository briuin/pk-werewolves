<template>
  <v-list class="player-details">
    <v-list-group :value="true" no-action prepend-icon="account_circle">
      <template v-slot:activator>
        <v-list-item-title>就坐玩家 ({{ seats.length }})</v-list-item-title>
      </template>

      <v-list-item v-for="(player, i) in seats" :key="'ready' + i">
        <v-list-item-title
          v-text="player.name + (player.isReady ? ' - 準備就緒' : '')"
        ></v-list-item-title>
        <v-list-item-action>
          <v-icon
            v-if="player.isBot"
            color="red"
            @click="removeBot(player.name)"
            >delete</v-icon
          >
          <v-icon v-else>account_circle</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list-group>
    <v-list-group :value="false" no-action prepend-icon="account_circle">
      <template v-slot:activator>
        <v-list-item-title>旁觀玩家 ({{ observers.length }})</v-list-item-title>
      </template>

      <v-list-item v-for="(player, i) in observers" :key="'ready' + i">
        <v-list-item-title v-text="player.name"></v-list-item-title>
        <v-list-item-action>
          <v-icon>account_circle</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameService from "@/services/game";
import PlayerService from "@/services/player";

@Component({
  subscriptions() {
    return {
      seats: GameService.seats$,
      players: GameService.players$,
    };
  },
})
export default class PlayerDetail extends Vue {
  seats: any[] = [];
  players: any[] = [];

  get observers() {
    return this.players.filter(
      (x) => !this.seats.find((s) => s.name === x.name)
    );
  }

  removeBot(name: string) {
    this.$socket.werewolves.emit("removeBot", { botName: name });
  }
}
</script>

<style lang="scss">
@media (max-width: 768px) {
  .player-details {
    .v-list-item__icon:first-child {
      display: none;
    }

    .v-list-group__items .v-list-item {
      padding-left: 5px !important;
    }
  }
}
</style>
