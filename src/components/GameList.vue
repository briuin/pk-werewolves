<template>
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">房號</th>
          <th class="text-left">房主</th>
          <th class="text-left">遊戲人數 / 總人數</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id" @click="selectedGame = game.id">
          <td>{{ game.id }}</td>
          <td>{{ game.owner }}</td>
          <td>
            {{ game.seats.length }}
            /
            {{ game.players.length }}
            <v-btn
              class="join-button"
              color="success"
              fab
              dark
              x-small
              @click="joinGame(game.id)"
              v-if="selectedGame === game.id && !joinedGame"
            >
              <v-icon>mdi-arrow-right-bold-circle</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PlayerService from "@/services/player";

@Component
export default class GameList extends Vue {
  @Prop() games!: any[];
  @Prop() joinedGame!: boolean;
  selectedGame = null;

  joinGame(gameId: number) {
    if (
      this.games
        .find(x => x.id === gameId)
        .players.find((x: any) => x.name === PlayerService.getName())
    ) {
      this.$router.push(`/game/${gameId}`);
      return;
    }
    this.$socket.werewolves.emit("join", {
      gameId,
      playerName: PlayerService.getName()
    });
  }
}
</script>

<style lang="scss" scoped>
.join-button {
  margin-left: 5px;
}
</style>
